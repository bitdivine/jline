#!/usr/bin/env node

var args = require('../lib/opt').fancy({filename:__filename, usage:
[ 'Usage: jline-sort [--help|--version]'
, '       jline-sort <key>'
].join("\n")});

var split     = require('split')
  , parsePath = require('./parsePath')
  , parseData = require('./clean')
  , getPath   = require('tree-math').getPath;

var by = parsePath(args['<key>']) // sort by this
  , lines = [];


parseData(process.stdin)
.on('comment', function(c){console.log(c);})
.on('jline', function(line){
    lines.push(line);
})
.on('end', function(x){
    lines = lines.sort(function(a,b){return getPath(a, by)>getPath(b, by)?1:-1;});
    lines.forEach(function(line){console.log(JSON.stringify(line));});
});

