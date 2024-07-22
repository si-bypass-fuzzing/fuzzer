#! /bin/sh
./src/out/Default/chrome --site-per-process --disable-popup-blocking --log-level=0 --enable-logging=stderr 1>log.txt 2>&1