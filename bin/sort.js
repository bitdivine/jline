#!/usr/bin/env node

// Sorts a file where each line is a JSON object by the provided key:

var by = process.argv[2];

var lines = [];
process.stdin
.pipe(require('split')())
.on('data', function(line){
    if (line.charAt(0) === '{') {
        try {
            lines.push(JSON.parse(line));
        }catch(e){
            console.error('Skipping malformed line');
        }
    }
})
.on('end', function(x){
    lines = lines.sort(function(a,b){return a[by]>b[by]?1:-1;});
    lines.forEach(function(line){console.log(JSON.stringify(line));});
});




