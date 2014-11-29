#!/usr/bin/env bash

# Prerequisites:
# sudo npm install -g numper
# Usage:
# cat your.jlines | jline-numper

path="$(./bin/parsePath.js "$1" | jline-foreach 'console.log(record.map(function(a){return JSON.stringify([a]);}).join(""))')"
echo "Collecting $path" >&2

jline-foreach \
'start::global.a = new(require("numper"))({interval:1000});a.on("aggregate", emit)' \
"jline::a.increment(record$path,1)"




