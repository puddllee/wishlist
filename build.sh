#!/bin/sh

echo 'Removing build dir'
rm -rf build/

#echo 'Cleaning build_tmp dir'
#rm -r build_tmp

echo 'Building meteor to build'
meteor build build

echo 'Untaring'
cd build
tar -zxf wishlist.tar.gz

echo 'Npm Install'
cd bundle/programs/server
npm install
cd ../../../..

#echo 'Removing build'
#rm -r build

#echo 'Moving build_tmp to build'
#mv build_tmp build

