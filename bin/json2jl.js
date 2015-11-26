#!/usr/bin/env node

var opt = require('../lib/opt').fancy({filename:__filename, usage:
[ 'Usage: jline-json2jl    <filename> [--path=<path>]'
, '       jline-json2jl -a <filename> [--path=<path>]'
, '       jline-json2jl -d <filename> [--path=<path>]'
, '       jline-json2jl -k <filename> [--path=<path>]'
, '       jline-json2jl --help'
, '       jline-json2jl --version'
].join("\n")});

var parsePath	= require('./parsePath')
  , fs		= require('fs');

function getPath(thing, path){
	return path.reduce(function(thing,bit){return thing && thing[bit];},thing);
}

var data = JSON.parse(fs.readFileSync(opt["<filename>"]));
var path = parsePath(opt["--path"]||'');
var selection = getPath(data,path);

if (opt["-a"]){
	var array = selection;
	if (!array){
		console.error("ERROR: Array missing");
		process.exit(1);
	}
	if ('object' !== typeof(array)){
		console.error("ERROR: Not an array:\n    ", JSON.stringify(array).substr(0,10)+"...");
		process.exit(2);
	}
	// Should be an array.  May be a dictionary, in which case we print just the values.
	if (Array.isArray(array)) array.forEach(function(d){console.log(JSON.stringify(d));});
	else         Object.keys(array).forEach(function(k){console.log(JSON.stringify(array[k]));});
} else if (opt["-d"]){
	var dict = selection;
	if (!dict){
		console.error("ERROR: Dict missing");
		process.exit(1);
	}
	if ('object' !== typeof(dict)){
		console.error("ERROR: Not a dictionary:\n    ", JSON.stringify(array).substr(0,10)+"...");
		process.exit(2);
	}
	// Should be a dict.  May be an array, in which case the indices are used as keys.
	if (Array.isArray(array)) array.forEach(function(d,i){console.log(JSON.stringify({key:i,val:d}));});
	else          Object.keys(dict).forEach(function(k){console.log(JSON.stringify({key:k,val:dict[k]}));});
} else if (opt["-k"]){
	var dict = selection;
	if (!dict){
		console.error("ERROR: Dict missing");
		process.exit(1);
	}
	if ('object' !== typeof(dict)){
		console.error("ERROR: Not a dictionary:\n    ", JSON.stringify(array).substr(0,10)+"...");
		process.exit(2);
	}
	// Should be a dict.  May be an array, in which case the indices are used as keys.
	if (Array.isArray(array)) array.forEach(function(d,i){console.log(i);});
	else          Object.keys(dict).forEach(function(k){console.log(JSON.stringify(k));});
} else {
	console.log(JSON.stringify(selection));
}
