#!/usr/bin/env node

// Apply a function to each record.

var keys  = process.argv.slice(2);
var values = {};
var rename = {};
keys.forEach(function(k){values[k] = 0;rename[k]='CUMULATIVE_'+k;});
var code  = function(record){
    keys.forEach(function(k){record[rename[k]] = values[k] += record[k];});
};

process.stdout.on('error',process.exit);
console.log.apply(null,['#'].concat(process.argv));

process.stdin
.pipe(require('split')())
.on('data', function(line){
    if (line.charAt(0) === '{'){
        var record = JSON.parse(line);
        code(record);
        console.log(JSON.stringify(record));
    }
});

