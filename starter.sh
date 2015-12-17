#!/bin/sh

if [ $(ps -e -o uid,cmd | grep $UID | grep node | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then

  export APP_ENV="production"
  export SRC_DIR="/var/www/wishlist/"
  export PATH=/usr/local/bin:$PATH
  export ROOT_URL='https://thewishlist.xyz'
  export PORT=3000
  export METEOR_SETTINGS="$(cat config/settings.json)"
  export MONGO_URL='mongodb://localhost:27017/wishlist'

    echo "Stopping current forever process"
    forever stop "$SRC_DIR"build/bundle/main.js

    echo "Loading environment variables"
    source config/"$APP_ENV"/env.sh

    echo "Starting forever process"
    forever --sourceDir "$SRC_DIR" -l "$SRC_DIR"logs/forever.log -o "$SRC_DIR"logs/out.log -e "$SRC_DIR"logs/error.log -a start build/bundle/main.js
fi
