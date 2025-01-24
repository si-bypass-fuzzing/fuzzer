#!/bin/sh
echo "setup depot_tools"
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git

echo "fetch chromium"
fetch --nohooks chromium
cd src 

echo "apply patch"
git checkout 8608cd257c61bbf2b6b89b3935f113b76700f7e7
# git apply ../patch.diff

COMMIT_DATE=$(git log -n 1 --pretty=format:%ci)
cd /app/depot_tools
git checkout $(git rev-list -n 1 --before="$COMMIT_DATE" main)

cd /app/src
# patch DEPS remove devtools-node-modules
git clean -ffd
gclient sync -D --force --reset --with_branch_heads

echo "install build deps"
./build/install-build-deps.sh

echo "run hooks"
gclient runhooks

git remote add ias gogs@git.ias.cs.tu-bs.de:browser-ipc-fuzzing/chrome-ipc-fuzzing.git
git fetch ias
git switch patch/69

# cd /app
# wget https://chromedriver.storage.googleapis.com/2.41/chromedriver_linux64.zip
# unzip chromedriver_linux64.zip
