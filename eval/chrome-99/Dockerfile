FROM ubuntu:18.04

ARG DEBIAN_FRONTEND=noninteractive
ARG UNAME=user
ARG PASSWD=user
ARG UID=
ARG GID=

RUN echo "deb-src http://archive.ubuntu.com/ubuntu/ bionic universe" >> /etc/apt/sources.list
RUN echo "deb-src http://archive.ubuntu.com/ubuntu/ bionic-updates universe" >> /etc/apt/sources.list

RUN apt update

# set locale
RUN apt-get install -y locales locales-all && locale-gen en_US.UTF-8
ENV LANG='en_US.UTF-8' LANGUAGE='en_US:en' LC_ALL='en_US.UTF-8'


# chrome dependencies
RUN apt install -y apache2-bin binutils binutils-aarch64-linux-gnu binutils-arm-linux-gnueabihf binutils-mips64el-linux-gnuabi64 binutils-mipsel-linux-gnu bison bzip2 cdbs curl dbus-x11 devscripts dpkg-dev elfutils fakeroot flex git-core gperf libapache2-mod-php7.2 libappindicator3-1 libappindicator3-dev libasound2 libasound2-dev libatk1.0-0 libatspi2.0-0 libatspi2.0-dev libbluetooth-dev libbrlapi0.6 libbrlapi-dev libbz2-1.0 libbz2-dev libc6 libc6-dev libcairo2 libcairo2-dev libcap2 libcap-dev libcups2 libcups2-dev libcurl4-gnutls-dev libdrm2 libdrm-dev libelf-dev libevdev2 libevdev-dev libexpat1 libffi6 libffi-dev libfontconfig1 libfreetype6 libgbm1 libgbm-dev libglib2.0-0 libglib2.0-dev libglu1-mesa-dev libgnome-keyring0 libgnome-keyring-dev libgtk-3-0 libgtk-3-dev libinput10 libinput-dev libjpeg-dev libkrb5-dev libnspr4 libnspr4-dev libnss3 libnss3-dev libpam0g libpam0g-dev libpango-1.0-0 libpci3 libpci-dev libpcre3 libpixman-1-0 libpng16-16 libpulse0 libpulse-dev libsctp-dev libspeechd2 libspeechd-dev libsqlite3-0 libsqlite3-dev libssl-dev libstdc++6 libudev1 libudev-dev libuuid1 libva-dev libvulkan1 libvulkan-dev libwayland-egl1-mesa libwww-perl libx11-6 libx11-xcb1 libxau6 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxdmcp6 libxext6 libxfixes3 libxi6 libxinerama1 libxkbcommon-dev libxrandr2 libxrender1 libxshmfence-dev libxslt1-dev libxss-dev libxt-dev libxtst6 libxtst-dev locales mesa-common-dev openbox p7zip patch perl php7.2-cgi pkg-config python python-crypto python-dev python-numpy python-openssl python-psutil python-setuptools python-yaml rpm ruby snapcraft subversion uuid-dev wdiff x11-utils xcompmgr xz-utils zip zlib1g

# user applications
RUN apt install -y curl gdb wget bash sudo git python3 build-essential lsb-release pkg-config vim python3-pip x11vnc xvfb tmux

# # install python deps
# # RUN apt-get build-dep python3-defaults
# RUN sudo apt-get install -y pkg-config
# RUN sudo apt-get install -y build-essential gdb lcov pkg-config libbz2-dev libffi-dev libgdbm-dev libgdbm-compat-dev liblzma-dev libncurses5-dev libreadline6-dev libsqlite3-dev libssl-dev lzma lzma-dev tk-dev uuid-dev zlib1g-dev

# # install python
# RUN wget https://github.com/python/cpython/archive/refs/tags/v3.9.17.tar.gz
# RUN tar -xf v3.9.17.tar.gz
# RUN cd cpython-3.9.17 && ./configure && make -s -j altinstall && cd -
# RUN python3.9 -m pip install selenium==4.8.0 bs4 flask psutil tmuxp

# install python3.12
ADD install-python3.12.sh /tmp/install-python3.12.sh
RUN /tmp/install-python3.12.sh

# RUN python3 -m pip install selenium==3.141.0 bs4 flask psutil tmuxp

## Remove root
RUN groupadd -g $GID -o $UNAME
RUN useradd --uid $UID --gid $GID --shell /bin/bash -m $UNAME && echo "$UNAME:$PASSWD" | chpasswd && adduser $UNAME sudo

RUN mkdir /app
RUN chown -R user:user /app
RUN chmod g+s /app

# RUN echo 'export PATH=$PATH:/app/depot_tools' >> $HOME/.bashrc
# RUN echo 'export LANG="en_US.UTF-8"' >> $HOME/.bashrc

USER $UNAME
RUN echo 'export PATH=$PATH:$HOME/.local/bin' >> $HOME/.bashrc
RUN echo 'export PATH=$PATH:/app/depot_tools' >> $HOME/.bashrc
RUN echo 'export DEPOT_TOOLS_UPDATE=0' >> $HOME/.bashrc
RUN echo 'export LANG="en_US.UTF-8"' >> $HOME/.bashrc
RUN echo "export LANG='en_US.UTF-8' LANGUAGE='en_US:en' LC_ALL='en_US.UTF-8'" >> $HOME/.bashrc
RUN echo 'export ASAN_OPTIONS=log_path=/app/asan.log:detect_odr_violation=1' >> $HOME/.bashrc

ADD requirements.txt /tmp/requirements.txt
RUN pip3.12 install -r /tmp/requirements.txt

RUN pip3 install --user tmuxp==1.7.0

# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# RUN /home/user/.nvm/nvm.sh install 12

WORKDIR /app



