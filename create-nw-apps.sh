#!/bin/bash

npm install git+https://github.com/speedskater/node-webkit-builder.git

#~/node_modules/.bin/nwbuild -o nw-build client
gulp nw
