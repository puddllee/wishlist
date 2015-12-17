#!/bin/sh

#rm -rf build/

echo 'Cleaning build_tmp dir'
rm -r build_tmp

echo 'Building meteor to build_tmp'
meteor build build_tmp

echo 'Untaring'
cd build_tmp
tar -zxf wishlist.tar.gz

echo 'Npm Install'
cd bundle/programs/server
npm install
cd ../../../..

echo 'Removing build'
rm -r build

echo 'Moving build_tmp to build'
mv build_tmp build

