#!/usr/bin/env python3

from io import TextIOWrapper
import mmap
import struct
import os
import csv
from multiprocessing import shared_memory
import logging

# SHM_NAME:str = "/coverage_shm"
SHM_SIZE:int = 0x100000

class ShmBitmap:
    def __init__(self, name: str):
        # # Open the shared memory object
        # self.fd:int = os.open('/dev/shm' + SHM_NAME, os.O_CREAT | os.O_RDWR)
        # os.ftruncate(self.fd,SHM_SIZE)

        # # Memory-map the shared memory object
        # self.shm = mmap.mmap(self.fd, SHM_SIZE, access=mmap.ACCESS_READ | mmap.ACCESS_WRITE| mmap.MAP_SHARED, prot=mmap.PROT_READ | mmap.PROT_WRITE)
        # if zero:
        #     for i in range(SHM_SIZE):
        #         self.shm[i] = 0

        # Open the shared memory object
        if os.path.exists(ShmBitmap.get_shm_path(name)):
            os.remove(ShmBitmap.get_shm_path(name))
        self.shm: shared_memory.SharedMemory = shared_memory.SharedMemory(name=ShmBitmap.get_shm_name(name), create=True, size=SHM_SIZE)
        self.shm.buf[:SHM_SIZE] = bytes(SHM_SIZE)

        self.num_edges:int = 0
        self.num_bytes:int = 0
        self.is_active:bool = True

    @classmethod
    def get_shm_name(cls, name:str):
        return f"/{name}_coverage_shm"

    @classmethod
    def get_shm_path(cls, name:str):
        return "/dev/shm" + ShmBitmap.get_shm_name(name)

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.cleanup()

    def __del__(self):
        # if the class is not context managed, close the shared memory object on destruction
        self.cleanup()

    def cleanup(self):
        if self.is_active:
            self.shm.close()
            self.shm.unlink()
            # os.remove('/dev/shm' + SHM_NAME)
            # os.close(self.fd)
            self.is_active = False

    def get_num_edges(self) -> int:
        if self.num_edges == 0:
            self.update_edge_count()
        return self.num_edges

    def get_num_bytes(self) -> int:
        if self.num_bytes == 0:
            self.update_edge_count()
        return self.num_bytes

    def get_edges(self) -> bytes:
        return self.shm.buf[4:self.num_bytes]

    def bit_count(self) -> int:
        if self.num_edges == 0:
            self.update_edge_count()
        return sum(bin(byte).count('1') for byte in self.get_edges())

    def update_edge_count(self):
        self.num_edges:int = struct.unpack('I', self.shm.buf[:4])[0]
        self.num_bytes:int = self.num_edges // 8 + (1 if self.num_edges % 8 != 0 else 0)
        logging.info("Updated number of edges: %d", self.num_edges)

class CoverageCollector:
    def __init__(self, name):
        self.name = name
        self.shm_bitmap = ShmBitmap(name)

        self.out_file: TextIOWrapper|None = None
        self.csv_writer = None

    def get_coverage(self) -> int:
        return self.shm_bitmap.bit_count()

    def get_relative_coverage(self) -> float:
        return self.get_coverage() / self.shm_bitmap.get_num_edges()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.shm_bitmap.cleanup()
        if self.out_file is not None:
            self.out_file.close()

    def init_output_file(self):
        self.out_file = open(f"{self.name}_coverage.csv", "w")
        self.csv_writer = csv.writer(self.out_file)

        self.csv_writer.writerow(["total_edges", self.shm_bitmap.get_num_edges()])
        self.csv_writer.writerow([0,0])
        self.out_file.flush()

    def write_coverage(self, input_id: int):
        logging.info(f"Coverage {input_id}: {self.get_coverage()} edges covered")
        if self.csv_writer is None:
            logging.error("Output file not initialized")
            self.init_output_file()
        assert self.csv_writer is not None and self.out_file is not None
        self.csv_writer.writerow([input_id, self.get_coverage()])
        self.out_file.flush()


def main():
    shm_bitmap = ShmBitmap("all")
    while True:
        if input("Press enter to update edges, q to quit: ") == 'q':
            break
        shm_bitmap.update_edge_count()
        print(f"Number of edges: {shm_bitmap.get_num_edges()}")
        print(f"Number of bytes: {shm_bitmap.get_num_bytes()}")
        print(f"Number of edges covered: {shm_bitmap.bit_count()}")


if __name__ == "__main__":
    main()