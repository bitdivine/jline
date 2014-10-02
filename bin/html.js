#!/usr/bin/env node

// Sorts a file where each line is a JSON object by the provided key:

var by = process.argv[2];

function csvRecord(record){
    var json = JSON.stringify(record);
    return json.substr(1,json.length-2);
}

function enclose(bound, thing){
    return '<'+bound+'>'+thing+'</'+bound+'>';
}

function record_as(record_type, field_type, record){
    if (!(record instanceof Array)) throw new Error('Not an array!'+String(record));
    return enclose(record_type, record.map(enclose.bind(null,field_type)).join(''));
}

function head(){
console.log(
['<html>'
,'<head>'
,'<script type="text/javascript" src="jquery-latest.js"></script>'
,'<script type="text/javascript" src="jquery.tablesorter.min.js"></script>'
,'<script>'
,'$(document).ready(function()'
,'    {'
,'        $($("table")[0]).tablesorter();'
,'    }'
,');'
,'</script>'
,'</head>'
].join("\n"));
}

function tail(){
console.log('</html>');
}


head();
console.log('<table>');
var headers;
process.stdin
.pipe(require('split')())
.on('data', function(line){
    if (line.charAt(0) === '{'){
        var record = JSON.parse(line);
        if (!headers) {
            headers = Object.keys(record);
            console.log(record_as('thead','th',headers));
        }
        var values = headers.map(function(col){return record[col];});
        console.log(record_as('tr','td',values));
    }
})
.on('end', function(){
    console.log('</table>');
    tail();
});

