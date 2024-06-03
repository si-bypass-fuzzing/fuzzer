#!/usr/bin/env python3
import argparse
import os

PATH_MAP = {
    "firefox": "./firefox-ipc-fuzzing/release-pw/dist/firefox/firefox",
    "chrome": "./chrome-ipc-fuzzing/src/out/Default/chrome",
    }

def generate_docker_compose(browser, num_services, tmpfs):
    tmp_data_root = "/dev/shm/ipcfuzzing" if tmpfs is True else "."

    content = "services:"

    for service_id in range(num_services):
        content += f"""
  ipcrafter-{service_id}:
    image: ipcrafter"""
        
        if service_id == 0:
          content += "\n    build: ."

        content += f"""
    user: user:user
    shm_size: '1gb'
    environment:
      - ID={service_id}
      - BROWSER={browser}
      - BROWSER_PATH={PATH_MAP[browser]}
    privileged: true
    cap_add:
      - SYS_ADMIN
    security_opt:
      - seccomp:unconfined
    ulimits:
      core: -1
    volumes:
      - ..:/app
      - {tmp_data_root}/volumes/{service_id}/origin-1:/app/server/origin-1
      - {tmp_data_root}/volumes/{service_id}/origin-2:/app/server/origin-2
      - {tmp_data_root}/volumes/{service_id}/logs:/app/logs
      - {tmp_data_root}/volumes/{service_id}/tmp:/tmp
      - ./volumes/{service_id}/crash:/app/crash
      - ./volumes/{service_id}/coredumps:/coredumps
    working_dir: /app
    entrypoint: /app/run.sh
"""
    return content

def make_dirs(num_services, tmpfs):
    for service_id in range(num_services):
        os.makedirs(f"./volumes/{service_id}/crash", exist_ok=True)
        os.makedirs(f"./volumes/{service_id}/coredumps", exist_ok=True)

        if tmpfs is True:
          os.makedirs(f"/dev/shm/ipcfuzzing/volumes/{service_id}/origin-1", exist_ok=True)
          os.makedirs(f"/dev/shm/ipcfuzzing/volumes/{service_id}/origin-2", exist_ok=True)
          os.makedirs(f"/dev/shm/ipcfuzzing/volumes/{service_id}/logs", exist_ok=True)
          os.makedirs(f"/dev/shm/ipcfuzzing/volumes/{service_id}/tmp", exist_ok=True)
        else:
          os.makedirs(f"./volumes/{service_id}/origin-1", exist_ok=True)
          os.makedirs(f"./volumes/{service_id}/origin-2", exist_ok=True)
          os.makedirs(f"./volumes/{service_id}/logs", exist_ok=True)
            

def main():
    parser = argparse.ArgumentParser(description='Generate a docker-compose.yml file for multiple services.')
    parser.add_argument(
        "-b",
        "--browser",
        help="browser to fuzz",
        type=str,
        choices=["chrome", "firefox"],
    )
    parser.add_argument(
        "-t",
        "--tmpfs",
        help="store inputs and logs on tmpfs",
        action="store_true"
    )
    parser.add_argument("-n", "--num_services", type=int, help='Number of services to generate in the docker-compose file')
    args = parser.parse_args()
    if args.num_services < 1:
        print("Number of services must be at least 1.")
        return

    make_dirs(args.num_services, args.tmpfs)
    docker_compose_content = generate_docker_compose(args.browser, args.num_services, args.tmpfs)
    with open("docker-compose.yml", "w") as file:
        file.write(docker_compose_content)

    print("docker-compose.yml file has been generated.")

if __name__ == "__main__":
    main()
