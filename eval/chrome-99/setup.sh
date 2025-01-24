#!/bin/sh
echo "setup depot_tools"
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git

echo "fetch chromium"
fetch --nohooks chromium
cd src 

echo "checkout old version"
git checkout 99.0.4844.84
COMMIT_DATE=$(git log -n 1 --pretty=format:%ci)

cd /app/depot_tools
git checkout $(git rev-list -n 1 --before="$COMMIT_DATE" main)

cd /app/src
git clean -ffd
gclient sync -D --force --reset --with_branch_heads

echo "install build deps"
./build/install-build-deps.sh

echo "run hooks"
gclient runhooks

echo "apply patch"
# git apply ../patch.diff

git remote add ias gogs@git.ias.cs.tu-bs.de:browser-ipc-fuzzing/chrome-ipc-fuzzing.git
git fetch ias
git switch patch/99