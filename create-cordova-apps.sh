#!/bin/bash

mkdir cordova-build
cd cordova-build

cordova create TTContacts tt.com.ttc TTContacts

cd TTContacts

cordova platform add ios

cordova plugin add org.apache.cordova.contacts

cordova prepare