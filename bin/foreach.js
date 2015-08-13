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

function setpath(subject,path,value){
	var c=path.length;
	path.reduce(function(s,n){return s[n]=--c?(s[n]||{}):value;var after=s[n];},subject);
}
function getpath(subject,path){
	return path.reduce(function(s,n){if(s!==undefined)return s[n];},subject);
}

var source = require('./clean')(process.stdin);
source.on('comment', function(c){console.log(c);});
eventHandlers.forEach(function(tuple){
    var event = tuple[0].toLowerCase();
    var code  = Function('require','emit','keyvals','setpath','getpath', 'record', 'lineNumber', 'line', 'recordNumber', tuple[1])
               .bind(null,req,      emit,  keyvals , setpath , getpath);
    code.name = event;
    if (['beg','begin','start','beginning'].indexOf(event)!== -1) code();
    else source.on(event, code);
});

