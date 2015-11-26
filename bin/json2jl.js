#!/usr/bin/env node

var opt = require('../lib/opt').fancy({filename:__filename, usage:
[ 'Usage: jline-json2jl <--help|--version>'
, '       jline-json2jl <filename>'
, '       jline-json2jl -a <array_path> <filename>'
, '       jline-json2jl -d <dict_path> <filename>'
].join("\n")});

console.log(opt);

var parsePath	= require('./parsePath')
  , fs		= require('fs');

function getPath(thing, path){
	return path.reduce(function(thing,bit){return thing && thing[bit];},thing);
}

var data = JSON.parse(fs.readFileSync(opt.filename));
if (opt.array_path){
	var path = parsePath(opt.array_path);
	var array = getPath(data,path);
	if (!array){
		console.error("ERROR: Array missing");
		process.exit(1);
	}
	if (!array.map){
		console.error("ERROR: Not an array:\n    ", JSON.stringify(array).substr(0,10)+"...");
		process.exit(2);
	}
	array.forEach(function(d){console.log(JSON.stringify(d));});
} else if (opt.dict_path){
	var path = parsePath(opt.dict_path);
	var dict = getPath(data,path);
	if (!dict){
		console.error("ERROR: Dict missing");
		process.exit(1);
	}
	if ('object' !== typeof(dict)){
		console.error("ERROR: Not a dictionary:\n    ", JSON.stringify(array).substr(0,10)+"...");
		process.exit(2);
	}
	Object.keys(dict).forEach(function(k){console.log(JSON.stringify({key:k,val:dict[k]}));});
} else {
	console.log(JSON.stringify(data));
}
