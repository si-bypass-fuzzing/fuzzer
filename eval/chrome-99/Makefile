.PHONY: docker-build clean
all: docker-run

UID = $(shell id -u)
GID = $(shell id -g)

PWD := $(shell pwd)

docker-build:
	docker build --build-arg UID=$(UID) --build-arg GID=$(GID) -t builder-99 .

docker-run-root:
	docker run -it --rm -u root --cap-add=SYS_ADMIN \
		-v $(PWD)/app:/app \
		builder-99 /bin/bash

docker-run:
	docker run -it --init --rm -u user --cap-add=SYS_ADMIN \
		-v $(PWD)/app:/app \
		-v $(PWD)/../..:/fuzzer \
		-v "$$SSH_AUTH_SOCK:$$SSH_AUTH_SOCK" -e SSH_AUTH_SOCK=$$SSH_AUTH_SOCK \
		builder-99 /bin/bash

docker-run-vnc:
	docker run -it --init --rm -u user --cap-add=SYS_ADMIN \
		-v $(PWD)/app:/app \
		-v $(PWD)/../..:/fuzzer \
		-v "$$SSH_AUTH_SOCK:$$SSH_AUTH_SOCK" -e SSH_AUTH_SOCK=$$SSH_AUTH_SOCK \
		-p 5900:5900 \
		builder-99 /bin/bash

# 		--network=host \
# -e DISPLAY="127.0.0.1":0 \

# clean:
#	 -rm -rf app/*
