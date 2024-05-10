#!/bin/bash

cd server
python3.12 ./server.py -b "127.0.0.1" -d ./origin-1 --browser $BROWSER 1>/dev/null 2>/dev/null &
python3.12 ./server.py -b "127.0.0.2" -d ./origin-2 -v --browser $BROWSER 1>/dev/null 2>/dev/null &

cd /app
python3.12 -m ipcrafter -w ./generator/webidl2json/json/$BROWSER -m ./generator/mdn -b $BROWSER -s ./server $BROWSER_PATH
