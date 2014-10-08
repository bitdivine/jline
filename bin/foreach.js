#!/usr/bin/env node

// Execute some code for each record.

if (process.argv[2] === '--help') {
    console.error(require('fs').readFileSync(__filename.replace(/.js$/,'.md'),{encoding:'utf8'}));
    process.exit(2);
}

var eventHandlers = [];
process.argv.slice(2).forEach(function(arg){
    var match = arg.match(/^([a-zA-Z]+)::(.*)/);
    if (match === null){
        eventHandlers.push(['jline',arg]);
    } else {
        eventHandlers.push(match.slice(1,3));
    }
});


var source = require('./clean')(process.stdin);
eventHandlers.forEach(function(tuple){
    var event = tuple[0].toLowerCase();
    var code  = Function('require', 'record', 'lineNumber', 'line', 'recordNumber', tuple[1]).bind(null,require);
    code.name = event;
    if (['beg','begin','start','beginning'].indexOf(event)!== -1) code();
    else source.on(event, code);
});

