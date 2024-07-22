.PHONY: docker-build clean
all: docker-run 

UID = $(shell id -u)
GID = $(shell id -g)

PWD := $(shell pwd)

docker-build:
	docker build --build-arg UID=$(UID) --build-arg GID=$(GID) -t builder-67 .

docker-run-root:
	docker run -it --rm -u root --cap-add=SYS_ADMIN \
		-v $(PWD)/app:/app \
		-v $(PWD)/setup.sh:/app/setup.sh:ro \
		-v $(PWD)/patch.diff:/app/patch.diff:ro \
		builder-67 /bin/bash

docker-run:
	docker run -it --rm -u user --cap-add=SYS_ADMIN \
		-v $(PWD)/app:/app \
		-v $(PWD)/setup.sh:/app/setup.sh:ro \
		-v $(PWD)/patch.diff:/app/patch.diff:ro \
		-v $(PWD)/fuzzorigin:/app/fuzzorigin \
		-p 5900:5900 \
		builder-67 /bin/bash


# clean:
# 	-rm -rf app/*

# 		--network=host 
#		--user $(shell id -u):$(shell id -g) \