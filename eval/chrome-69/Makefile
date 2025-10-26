.PHONY: docker-build clean
all: docker-run

UID = $(shell id -u)
GID = $(shell id -g)

PWD := $(shell pwd)

docker-build:
	docker build --build-arg UID=$(UID) --build-arg GID=$(GID) -t builder-69 .

docker-run-root:
	docker run -it --rm -u root --cap-add=SYS_ADMIN \
		-v $(PWD)/app:/app \
		builder-69 /bin/bash

docker-run:
	docker run -it --init --rm -u user --cap-add=SYS_ADMIN \
		-v $(PWD)/app:/app \
		-v $(PWD)/app-67:/app-67 \
		-v $(PWD)/../..:/fuzzer \
		-v ~/.gitconfig:/home/user/.gitconfig:ro \
		-v "$$SSH_AUTH_SOCK:$$SSH_AUTH_SOCK" -e SSH_AUTH_SOCK=$$SSH_AUTH_SOCK \
		builder-69 /bin/bash

docker-run-vnc:
	docker run -it --init --rm -u user --cap-add=SYS_ADMIN \
		-v $(PWD)/app:/app \
		-v $(PWD)/app-67:/app-67 \
		-v $(PWD)/../..:/fuzzer \
		-v "$$SSH_AUTH_SOCK:$$SSH_AUTH_SOCK" -e SSH_AUTH_SOCK=$$SSH_AUTH_SOCK \
		-p 5900:5900 \
		builder-69 /bin/bash


# clean:
# 	-rm -rf app/*

# 		--network=host
#		--user $(shell id -u):$(shell id -g) \
		#  \
		#		--network host \
		# 		-v $(PWD)/patch.diff:/app/patch.diff:ro \
