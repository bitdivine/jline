#!/usr/bin/env bash

# Prerequisites:
# sudo npm install -g numper
# Usage:
# cat your.jlines | jline-numper

path="$(jline-parsePath "$1" | jline-foreach 'console.log(record.map(function(a){return JSON.stringify([a]);}).join(""))')"
echo "Collecting $path" >&2

jline-foreach \
'start::global.a = new(require("numper"))({interval:1000});global.ksort=require("tree-math").ksort;a.on("aggregate", function(d){d.counts=ksort(d.counts);emit(d);})' \
"jline::a.increment(record$path,1)"




