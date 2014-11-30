#!/usr/bin/env node

// Apply a function to each record.

if (process.argv[2] === '--help') {
    console.error(require('fs').readFileSync(__filename.replace(/.js$/,'.md'),{encoding:'utf8'}));
    process.exit(2);
}

var codes  = process.argv.slice(2).map(function(arg){
    return Function('require','record','lineNumber','line','recordNumber',arg);
});
function map(record, lineNumber, line, recordNumber){
    codes.forEach(function(code){code(require, record, lineNumber, line, recordNumber);});
    console.log(JSON.stringify(record));
}

process.stdout.on('error',process.exit);
require('./clean')(process.stdin)
.on('jline', map);

