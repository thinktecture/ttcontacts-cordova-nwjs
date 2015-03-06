#!/bin/bash

npm install node-webkit-builder

mkdir nw-build

~/node_modules/.bin/nwbuild -o nw-build client
