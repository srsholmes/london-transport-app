#!/usr/bin/env bash

install_brew_deps() {
  brew update
  brew upgrade node
  brew reinstall openssl
  brew install ruby yarn
#  brew install mrbfrank/android-sdk-24/android-sdk
}

echo "install deps"
install_brew_deps


