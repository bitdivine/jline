#!/usr/bin/env node

var divider     = process.argv.indexOf('--');
if ((process.argv[2] === undefined) || (process.argv[2] === '--help') || (divider === -1)) {
    console.error(require('fs').readFileSync(__filename.replace(/.js$/,'.md'),{encoding:'utf8'}));
    process.exit(2);
}



var parseStream   = require('./clean')
  , parsePath     = require('./parsePath')
  , getPath       = require('tree-math').getPath
  , setPath       = require('tree-math').setPath
  , incrementPath = require('tree-math').incrementPath
  , find          = require('tree-math').find;

var values      = process.argv.slice(divider+1);
var breakdown   = process.argv.slice(2, divider);

var breakdown   = breakdown.map(function(s){return s.split(':').map(parsePath);});
var values      = values   .map(function(s){return s.split(':').map(parsePath);});

// Each field is inval:outval unless the two are the same.
var inpaths     = breakdown.map(function(a){return a[0];});
var outpaths    = breakdown.map(function(a){return a.length===1?a[0]:a[1];});
var invals      = values.map(function(a){return a[0];});
var outvals     = values.map(function(a){return a.length===1?a[0]:a[1];});

var all = {};
parseStream(process.stdin)
.on('jline', function(record){
        var storepath = inpaths.map(function(path){return getPath(record, [].concat(path));});
        invals.forEach(function(inpath, index){
            incrementPath(all, storepath.concat(outvals[index]), getPath(record, [].concat(inpath)));
        });
})
.on('end', function(){
        var maxdepth = inpaths.length;
        var path = [];
	find(all, function(path, val){
            outpaths.forEach(function(outpath, index){
                setPath(val, outpath.concat([]), path[index]);
            });
            console.log(JSON.stringify(val));
        }, path, maxdepth);
});

