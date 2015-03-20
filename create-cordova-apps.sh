#!/bin/bash

mkdir cordova-build
cd cordova-build

cordova create TTContacts tt.com.ttc TTContacts --link-to=../client
cd TTContacts

cordova platform add ios
cordova plugin add org.apache.cordova.contacts

cp -r ../../client/assets/resources .
ionic resources

cordova prepare
