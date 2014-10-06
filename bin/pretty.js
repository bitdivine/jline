#!/usr/bin/env node

// Pretty print.

if (process.argv[2] === '--help') {
    console.error(require('fs').readFileSync(__filename.replace(/.js$/,'.md'),{encoding:'utf8'}));
    process.exit(2);
}


require('./clean')(process.stdin)
.on('jline', function(record){
    console.log(JSON.stringify(record,null,2));
});

