#!/usr/bin/env node

// Apply a function to each record.

var code  = Function('record',process.argv[2]);

process.stdin
.pipe(require('split')())
.on('data', function(line){
    if (line.charAt(0) === '{'){
        var record = JSON.parse(line);
        code(record);
        console.log(JSON.stringify(record));
    }
});

