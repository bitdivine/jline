#!/usr/bin/env node

if ((process.argv[2] === undefined) || (process.argv[2] === '--help')) {
    console.error(require('fs').readFileSync(__filename.replace(/.js$/,'.md'),{encoding:'utf8'}));
    process.exit(1);
}

process.stdout.on('error',process.exit);

var split     = require('split')
  , parsePath = require('./parsePath')
  , parseData = require('./clean')
  , getPath   = require('tree-math').getPath;

var by = parsePath(process.argv[2]) // sort by this
  , lines = [];


parseData(process.stdin)
.on('jline', function(line){
    lines.push(line);
})
.on('end', function(x){
    lines = lines.sort(function(a,b){return getPath(a, by)>getPath(b, by)?1:-1;});
    lines.forEach(function(line){console.log(JSON.stringify(line));});
});

