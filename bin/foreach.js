#!/usr/bin/env node

// Apply a function to each record.

var code  = Function('record',process.argv[2]);

require('./clean')(process.stdin)
.on('jline', function(record){
    code(record);
});

