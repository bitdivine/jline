#!/usr/bin/env node

if ((process.argv[2] === undefined) || (process.argv[2] === '--help')) {
    console.error(require('fs').readFileSync(__filename.replace(/.js$/,'.md'),{encoding:'utf8'}));
    process.exit(1);
}

var by = process.argv[2]
  , getPath = new Function("x", "try { return x"+(by.charAt(0)==='['?by:'.'+by) + ";}catch(e){}")
  , lines = []
  , lineNumber = 0;

process.stdin
.pipe(require('split')(JSON.parse))
.on('data', function(line){
    lineNumber++;
    lines.push(line);
})
.on('error', function(e){
    console.error("Malformed JSON on line", ++lineNumber, e);
})
.on('end', function(x){
    lines = lines.sort(function(a,b){return getPath(a)>getPath(b)?1:-1;});
    lines.forEach(function(line){console.log(JSON.stringify(line));});
});

