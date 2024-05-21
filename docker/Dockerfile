FROM ubuntu:22.04

ARG DEBIAN_FRONTEND=noninteractive
ARG UNAME=user
ARG PASSWD=user
ARG UID=
ARG GID=

RUN apt update

# set locale
RUN apt-get install -y locales locales-all && locale-gen en_US.UTF-8
ENV LANG='en_US.UTF-8' LANGUAGE='en_US:en' LC_ALL='en_US.UTF-8'

# common dependencies
RUN apt install -y curl wget bash sudo git python3 python3-pip vim

# chrome dependencies
RUN apt install -y binutils binutils-aarch64-linux-gnu binutils-arm-linux-gnueabihf binutils-mips64el-linux-gnuabi64 binutils-mipsel-linux-gnu bison bzip2 cdbs curl dbus-x11 devscripts dpkg-dev elfutils fakeroot flex git-core gperf lib32gcc-s1 lib32stdc++6 lib32z1 libasound2 libasound2-dev libatk1.0-0 libatspi2.0-0 libatspi2.0-dev libbluetooth-dev libbrlapi-dev libbrlapi0.8 libbz2-1.0 libbz2-dev libc6 libc6-dev libc6-i386 libcairo2 libcairo2-dev libcap-dev libcap2 libcgi-session-perl libcups2 libcups2-dev libcurl4-gnutls-dev libdrm-dev libdrm2 libegl1 libelf-dev libevdev-dev libevdev2 libexpat1 libffi-dev libffi7 libfontconfig1 libfreetype6 libgbm-dev libgbm1 libgl1 libglib2.0-0 libglib2.0-dev libglu1-mesa-dev libgtk-3-0 libgtk-3-dev libinput-dev libinput10 libjpeg-dev libkrb5-dev libncurses5 libnspr4 libnspr4-dev libnss3 libnss3-dev libpam0g libpam0g-dev libpango-1.0-0 libpangocairo-1.0-0 libpci-dev libpci3 libpcre3 libpixman-1-0 libpng16-16 libpulse-dev libpulse0 libsctp-dev libspeechd-dev libspeechd2 libsqlite3-0 libsqlite3-dev libssl-dev libstdc++6 libsystemd-dev libudev-dev libudev1 libuuid1 libva-dev libvulkan-dev libvulkan1 libwayland-egl1 libwayland-egl1-mesa libwww-perl libx11-6 libx11-xcb1 libxau6 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxdmcp6 libxext6 libxfixes3 libxi6 libxinerama1 libxkbcommon-dev libxrandr2 libxrender1 libxshmfence-dev libxslt1-dev libxss-dev libxt-dev libxtst-dev libxtst6 lighttpd locales mesa-common-dev openbox p7zip patch perl pkg-config rpm ruby subversion uuid-dev wdiff x11-utils xcompmgr xvfb xz-utils zip zlib1g zstd

# firefox dependencies
RUN apt install -y bash findutils gzip libxml2 m4 make perl tar unzip watchman

# install python3.12
ADD install-python3.12.sh /tmp/install-python3.12.sh
RUN /tmp/install-python3.12.sh

# user applications
RUN apt install -y  gdb build-essential lsb-release pkg-config x11vnc xvfb tmux systemd-coredump psmisc

# activate core dumps
RUN sysctl -w kernel.core_pattern=/coredumps/core-%e.%p.%h.%t

# Remove root
RUN groupadd -g ${GID} -o $UNAME
RUN useradd --uid ${UID} --gid ${GID} --shell /bin/bash -m ${UNAME} && echo "$UNAME:$PASSWD" | chpasswd && adduser ${UNAME} sudo

RUN mkdir /app
RUN chown -R user:user /app
RUN chmod g+s /app

USER ${UNAME}
RUN echo 'export PATH=$PATH:$HOME/.local/bin' >> $HOME/.bashrc
RUN echo 'source "$HOME/.cargo/env"' >> $HOME/.bashrc
RUN echo 'export PATH=$PATH:/app/depot_tools' >> $HOME/.bashrc
RUN echo 'export DEPOT_TOOLS_UPDATE=0' >> $HOME/.bashrc
RUN echo "export LANG='en_US.UTF-8' LANGUAGE='en_US:en' LC_ALL='en_US.UTF-8'" >> $HOME/.bashrc

# install rust 1.75.0
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- --default-toolchain none -y
ENV PATH="/home/user/.cargo/bin:${PATH}"
RUN rustup toolchain install '1.75.0'

RUN pip3 install tmuxp mercurial

ADD requirements.txt /tmp/requirements.txt
RUN pip3.12 install -r /tmp/requirements.txt

WORKDIR /app



