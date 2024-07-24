FROM ubuntu:14.04

ARG DEBIAN_FRONTEND=noninteractive
ARG UNAME=user
ARG PASSWD=user
ARG UID=
ARG GID=

RUN apt update
RUN apt install -y curl gdb wget bash sudo git python build-essential lsb-release pkg-config vim python-pip x11vnc xvfb python3-pip tmux

# chrome dependencies
RUN apt install -y  ant apache2.2-bin autoconf binutils-aarch64-linux-gnu binutils-arm-linux-gnueabihf bison bzip2 cdbs cmake curl dbus-x11 devscripts dpkg-dev elfutils fakeroot flex g++ g++-4.8-multilib g++-4.8-multilib-arm-linux-gnueabihf g++-arm-linux-gnueabihf g++-mingw-w64-i686 gawk gcc-4.8-multilib-arm-linux-gnueabihf git-core git-svn gperf intltool lib32gcc1 lib32ncurses5-dev lib32stdc++6 lib32z1-dev libapache2-mod-php5 libappindicator-dev libappindicator1 libappindicator3-1 libappindicator3-dev libasound2 libasound2-dev libatk1.0-0 libav-tools libbluetooth-dev libbrlapi-dev libbrlapi0.6 libbz2-1.0 libbz2-dev libc6 libc6-dev-armhf-cross libc6-i386 libcairo2 libcairo2-dev libcap-dev libcap2 libcups2 libcups2-dev libcurl4-gnutls-dev libdrm-dev libelf-dev libexpat1 libffi-dev libffi6 libfontconfig1 libfreetype6 libgbm-dev libglib2.0-0 libglib2.0-dev libglu1-mesa-dev libgnome-keyring-dev libgnome-keyring0 libgtk-3-0 libgtk-3-dev libgtk2.0-0 libgtk2.0-dev libjpeg-dev libkrb5-dev libnspr4 libnspr4-dev libnss3 libnss3-dev libpam0g libpam0g-dev libpango1.0-0 libpci-dev libpci3 libpcre3 libpixman-1-0 libpng12-0 libpulse-dev libpulse0 libsctp-dev libspeechd-dev libspeechd2 libsqlite3-0 libsqlite3-dev libssl-dev libstdc++6 libtinfo-dev libtool libudev-dev libudev1 libuuid1 libwayland-egl1-mesa libwww-perl libx11-6 libx11-xcb1 libxau6 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxdmcp6 libxext6 libxfixes3 libxi6 libxinerama1 libxkbcommon-dev libxrandr2 libxrender1 libxslt1-dev libxss-dev libxt-dev libxtst-dev libxtst6 linux-libc-dev-armhf-cross locales openbox p7zip patch perl php5-cgi pkg-config python python-cherrypy3 python-crypto python-dev python-numpy python-opencv python-openssl python-psutil python-yaml realpath rpm ruby subversion texinfo uuid-dev wdiff x11-utils xcompmgr xsltproc xutils-dev xvfb xz-utils zip zlib1g

# install python3.6
# RUN apt install -y libssl-dev libncurses5-dev libsqlite3-dev libreadline-dev libtk8.6 libgdm-dev libdb4o-cil-dev libpcap-dev zlib1g-dev
# RUN wget https://www.python.org/ftp/python/3.6.10/Python-3.6.10.tar.xz
# RUN tar -xJf Python-3.6.10.tar.xz
# RUN cd Python-3.6.10 && ./configure && sudo make altinstall && cd -
# RUN python3.6 -m pip install selenium==3.141.0 bs4 flask psutil tmuxp

ADD install-openssl-1.1.1.sh /tmp/install-openssl-1.1.1.sh
RUN /tmp/install-openssl-1.1.1.sh

# install python3.12
ADD install-python3.12.sh /tmp/install-python3.12.sh
RUN /tmp/install-python3.12.sh

## Remove root
RUN groupadd -g $GID -o $UNAME
RUN useradd --uid $UID --gid $GID --shell /bin/bash -m $UNAME && echo "$UNAME:$PASSWD" | chpasswd && adduser $UNAME sudo

# activate passwordless sudo
RUN echo 'username ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers

RUN mkdir /app
RUN chown -R user:user /app
RUN chmod g+s /app

USER $UNAME
RUN echo 'export PATH=$PATH:$HOME/.local/bin' >> $HOME/.bashrc
RUN echo 'export PATH=$PATH:/app/depot_tools' >> $HOME/.bashrc
RUN echo 'export DEPOT_TOOLS_UPDATE=0' >> $HOME/.bashrc
RUN echo 'export LANG=C.UTF-8' >> $HOME/.bashrc
RUN echo 'export LC_ALL=C.UTF-8' >> $HOME/.bashrc
RUN echo 'export ASAN_OPTIONS=log_path=/app/asan.log:detect_odr_violation=1' >> $HOME/.bashrc

ADD requirements.txt /tmp/requirements.txt
RUN pip3.12 install -r /tmp/requirements.txt

RUN pip3 install --user tmuxp==1.7.0

WORKDIR /app



