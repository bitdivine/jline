#!/usr/bin/env node

// Render lines of JSON as CSV.

var by = process.argv[2];

function csvRecord(record){
    var json = JSON.stringify(record);
    return json.substr(1,json.length-2);
}


var headers;
process.stdin
.pipe(require('split')())
.on('data', function(line){
    if (line.charAt(0) === '{'){
        var record = JSON.parse(line);
        if (!headers) {
            headers = Object.keys(record);
            console.log(csvRecord(headers));
        }
        console.log(csvRecord(headers.map(function(col){return record[col];})));
    }
});

