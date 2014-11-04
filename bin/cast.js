#!/usr/bin/env node

if ((process.argv[2] === undefined) || (process.argv[2] === '--help')) {
    console.error(require('fs').readFileSync(__filename.replace(/.js$/,'.md'),{encoding:'utf8'}));
    process.exit(2);
}

var parseStream = require('./clean');
var parsePath   = require('./parsePath');
var fields = process.argv.slice(2).map(function(s){
    var parts = s.split(':');
    return [parsePath(parts[0]), castFun(parts[1])];
});

function castFun(s){
    switch(s){
    case 'int': return function(x){if ((x === undefined)||(x === null)) return x; return parseInt(x);};
    case 'str': return function(x){if ((x === undefined)||(x === null)) return x; return String(x);};
    case 'num': return function(x){if ((x === undefined)||(x === null)) return x; return Number(x);};
    default:    throw new Error("Unsupported type: "+String(s));
    }
}

function getPath(thing, path){
    path.map(function(bit){
        if (typeof(thing) !== 'undefined') {
            thing = thing[bit];
        }
    });
    return thing;
}
function setPath(dict, path, val){
    var last = path.pop();
    var next;
    while(path.length > 0) {
        next = path.shift(1);
        if (typeof dict[next] === 'undefined') {
            dict[next] = {};
        }
        dict = dict[next];
    }
    dict[last] = val;
}

var headers;
parseStream(process.stdin)
.on('jline', function(record){
        fields.forEach(function(field){
            var val = getPath(record, [].concat(field[0]));
            var parsed = field[1](val);
            setPath(record, [].concat(field[0]), parsed);
        });
        console.log(JSON.stringify(record));
});

