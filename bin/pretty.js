#!/usr/bin/env node

// Apply a function to each record.

require('./clean')(process.stdin)
.on('jline', function(record){
    console.log(JSON.stringify(record,null,2));
});

