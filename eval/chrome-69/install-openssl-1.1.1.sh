#!/bin/bash

sudo apt-get install build-essential checkinstall libreadline-gplv2-dev libncursesw5-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev

cd /tmp
curl -L https://www.openssl.org/source/old/1.1.1/openssl-1.1.1.tar.gz | tar xz
cd openssl-1.1.1/
./config shared --prefix=/opt/openssl-1.1.1
sudo make
sudo make install
