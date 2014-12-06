#!/usr/bin/env node

// Apply a function to each record.
var args = require('../lib/opt').fancy({filename:__filename, usage:
[ 'Usage: jline-foreach [--help|--version]'
, '       jline-foreach [-l] <cmd>...'
].join("\n")});

var codes  = args['<cmd>'].map(function(arg){
    return Function('require','record','lineNumber','line','recordNumber',arg);
});
function map(record, lineNumber, line, recordNumber){
    codes.forEach(function(code){code(require, record, lineNumber, line, recordNumber);});
    console.log(JSON.stringify(record));
}

require('./clean')(process.stdin)
.on('jline', map);

