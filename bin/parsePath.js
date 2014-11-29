#!/usr/bin/env node

var assert = require('assert');
module.exports = function(s){
	var bits = [];
	var re = /(?:^|[.])([-a-zA-Z0-9_]+)|\[\W*("(?:\\.|[^"])*")\W*\]|\[\W*([0-9]+)\W*\]/g;
	var match;
	var index = 0;
	while(null !== (match = re.exec(s))){
		assert(match.index === index);
		if (undefined !== match[1]) {
			bits.push(match[1]);
		} else if (undefined !== match[2]) {
			bits.push(JSON.parse(match[2]));
		} else {
			bits.push(Number(match[3]));
		}
		index = re.lastIndex;
	}
	return bits;
};

if(require.main === module) {

    if (process.argv[2] === '--help') {
        console.error(require('fs').readFileSync(__filename.replace(/.js$/,'.md'),{encoding:'utf8'}));
        process.exit(1);
    }

    console.log(JSON.stringify(module.exports(process.argv[2])));
}

