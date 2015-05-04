#!/bin/bash

mkdir cordova-build
cd cordova-build

cordova create TTContacts tt.com.ttc TTContacts --link-to=../client
cd TTContacts

cordova platform add ios
cordova platform add android
cordova plugin add cordova-plugin-contacts

cp -r ../../client/assets/resources .
ionic resources

cordova prepare
