#!/usr/bin/env node

// Execute some code for each record.

require('../lib/opt').fancy({filename:__filename, usage:
[ 'Usage: jline-foreach [--help|--version]'
, '       jline-foreach [-l] <cmd>...'
].join("\n")});

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
source.on('comment', function(c){console.log(c);});
eventHandlers.forEach(function(tuple){
    var event = tuple[0].toLowerCase();
    var code  = Function('require','emit','keyvals', 'record', 'lineNumber', 'line', 'recordNumber', tuple[1])
               .bind(null,req,      emit,  keyvals);
    code.name = event;
    if (['beg','begin','start','beginning'].indexOf(event)!== -1) code();
    else source.on(event, code);
});

