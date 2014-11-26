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

// "builtin" functions.
function req(name){
        return require(name, {});
}

function emit(data){
    console.log(JSON.stringify(data));
}

function keyvals(dict, callback){
    Object.keys(dict).forEach(function(k){callback(k,dict[k]);});
}

var source = require('./clean')(process.stdin);
eventHandlers.forEach(function(tuple){
    var event = tuple[0].toLowerCase();
    var code  = Function('require','emit','keyvals', 'record', 'lineNumber', 'line', 'recordNumber', tuple[1])
               .bind(null,req,      emit,  keyvals);
    code.name = event;
    if (['beg','begin','start','beginning'].indexOf(event)!== -1) code();
    else source.on(event, code);
});

