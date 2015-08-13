#!/usr/bin/env bash

# Prerequisites:
# sudo npm install -g numper
# Usage:
# cat your.jlines | jline-numper

path="$(jline-parsePath "$1" | jline-foreach 'console.log(record.map(function(a){return JSON.stringify([a]);}).join(""))')"
echo "Collecting $path" >&2

jline-foreach \
'start::global.a = new(require("numper"))({interval:process.env.interval||1000});a.on("aggregate", emit)' \
"jline::var val=Number(record$path);if(!isNaN(val)){a.increment('sum',val); a.increment('count',1);}"




