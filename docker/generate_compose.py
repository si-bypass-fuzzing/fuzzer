#!/usr/bin/env python3
import argparse
import os

PATH_MAP = {
    "firefox": "./firefox-ipc-fuzzing/release-pw/dist/firefox/firefox",
    "chrome": "./chrome-ipc-fuzzing/out/Default/chrome",
    }

def generate_docker_compose(browser, num_services):
    content = """version: '3.8'

services:"""

    for id in range(num_services):
        content += f"""
  app{id}:
    build: .
    user: user:user
    environment:
      - ID={id}
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
      - ./volumes/{id}/origin-1:/app/server/origin-1
      - ./volumes/{id}/origin-2:/app/server/origin-2
      - ./volumes/{id}/logs:/app/logs
      - ./volumes/{id}/crash:/app/crash
      - ./volumes/{id}/coredumps:/coredumps
    working_dir: /app
    command: /bin/sh -c "./run.sh"
"""
    return content

def make_dirs(num_services):
    for id in range(num_services):
        os.makedirs(f"./volumes/{id}/origin-1", exist_ok=True)
        os.makedirs(f"./volumes/{id}/origin-2", exist_ok=True)
        os.makedirs(f"./volumes/{id}/logs", exist_ok=True)
        os.makedirs(f"./volumes/{id}/crash", exist_ok=True)
        os.makedirs(f"./volumes/{id}/coredumps", exist_ok=True)

def main():
    parser = argparse.ArgumentParser(description='Generate a docker-compose.yml file for multiple services.')
    parser.add_argument(
        "-b",
        "--browser",
        help="browser to fuzz",
        type=str,
        choices=["chrome", "firefox"],
    )
    parser.add_argument('num_services', type=int, help='Number of services to generate in the docker-compose file')
    args = parser.parse_args()
    if args.num_services < 1:
        print("Number of services must be at least 1.")
        return

    make_dirs(args.num_services)
    docker_compose_content = generate_docker_compose(args.browser, args.num_services)
    with open("docker-compose.yml", "w") as file:
        file.write(docker_compose_content)

    print("docker-compose.yml file has been generated.")

if __name__ == "__main__":
    main()
