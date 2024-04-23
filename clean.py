#!/usr/bin/env python3

import os

def clean():
    # iterate over all subdirectories of this directory and get the name of the subdirectory
    for subdir in os.listdir():
        # check if the subdirectory is a directory
        if os.path.isdir(subdir):
            # iterate over all files in the subdirectory
            for root,_,filenames in os.walk(subdir):
                # check if the file is a python file
                for file in filenames:
                    if file.startswith("input-") and file.endswith(".html"):
                        fileno = file.split("-")[1].split("_")[0]
                        if int(subdir) - int(fileno) > 10:
                            print(f"Delete {subdir} {fileno} {os.path.join(root, file)}")
                            os.remove(os.path.join(root, file))


if __name__ == "__main__":
    clean()
