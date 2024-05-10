.PHONY: docker-build # compose-build docker-compose.yml
# all: compose-run

UID = $(shell id -u)
GID = $(shell id -g)

PWD := $(shell pwd)
# NUM_SERVICES := 64

docker-build:
	docker build --build-arg UID=$(UID) --build-arg GID=$(GID) -t ipcrafter .

docker-run-root:
	docker run -it --rm -u root --cap-add=SYS_ADMIN \
		-v $(PWD)/..:/app \
		ipcrafter /bin/bash

docker-run:
	docker run -it --rm -u user --cap-add=SYS_ADMIN \
		-v $(PWD)/..:/app \
		-v $(PWD)/tmp:/app/server/origin-1 \
		--mount type=bind,src=$${SSH_AUTH_SOCK},dst=$${SSH_AUTH_SOCK} \
        --env SSH_AUTH_SOCK \
		ipcrafter /bin/bash


# docker-compose.yml:
# 	python3 generate_compose.py $(NUM_SERVICES)

# compose-build: docker-compose.yml
# 	docker compose build --build-arg UID=$(UID) --build-arg GID=$(GID)

# compose-run:
# 	docker compose up

