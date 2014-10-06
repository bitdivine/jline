#!/usr/bin/env node

// Execute some code for each record.

if (process.argv[2] === '--help') {
    console.error(require('fs').readFileSync(__filename.replace(/.js$/,'.md'),{encoding:'utf8'}));
    process.exit(2);
}

var code  = Function('record',process.argv[2]);

require('./clean')(process.stdin)
.on('jline', function(record){
    code(record);
});

