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
	path.reduce(function(s,n){return s[n]=(--c?(s[n]||{}):value);},subject);
}
function getpath(subject,path){
	return path.reduce(function(s,n){if(s!==undefined)return s[n];},subject);
}
var tm = require('tree-math');

function find(data, options, callback) {
    if (typeof(options)==='function'){
        callback = options;
        options = {};
    }
    var prefix   = options.prefix ? options.prefix : [];
    var maxdepth = options.maxdepth === undefined? -1: options.maxdepth;
    return flatten(data, callback, prefix, maxdepth);
}
function flatten(data, callback, prefix, maxdepth) {
    if (maxdepth === 0){
        return callback(prefix, data);
    } else {
        var path, val, ans;
        for (var key in data) {
            path = prefix.slice(0);
            path.push(key);
            val = data[key];
            ans = (typeof(val) === 'object')
                ? flatten(val, callback, path, maxdepth-1)
                : callback(path, val);
            if (ans) return ans;
        }
    }
}


var source = require('./clean')(process.stdin);
source.on('comment', function(c){console.log(c);});
eventHandlers.forEach(function(tuple){
    var event = tuple[0].toLowerCase();
    var code  = Function('require','emit','keyvals','setpath','getpath','tm','find','flatten', 'record', 'lineNumber', 'line', 'recordNumber', tuple[1])
               .bind(null,req,      emit,  keyvals , setpath , getpath , tm , find , flatten);
    code.name = event;
    if (['beg','begin','start','beginning'].indexOf(event)!== -1) code();
    else source.on(event, code);
});

