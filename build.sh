#!/bin/sh

rm -rf build/
meteor build build
cd build
tar -zxf wishlist.tar.gz
cd bundle/programs/server
npm install
cd ../../../..
