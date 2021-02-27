#!/usr/bin/env node

// Join stdin with zero or more dictionaries.

const   fs = require('fs'),
        jline = require('jline'),
        parseStream = jline.parseStream;

var by    = process.argv[2]
  , files = process.argv.slice(3);

process.stdout.on('error',process.exit);
console.log.apply(null,['#'].concat(process.argv));

combiDict(by, files).then(combined => join(process.stdin, by, combined)).then(() => process.exit(0));

function join(infilePointer, joinKey, dictionary){
	console.error(`Enriching with ${Object.keys(dictionary).length} values`);
	return new Promise((yay, nay) => {try {
		parseStream(infilePointer)
		.on('jline', (record) => {
			const key = record[joinKey];
			const enrichment = dictionary[key];
			const ans = ((undefined === key) || (undefined === enrichment)) ? record : extend(record, enrichment);
			console.log(JSON.stringify(ans));
		})
		.on('error', (e) => nay(e))
		.on('end', () => yay());
	} catch (e) { nay(e); }});
}

function createReadStream(filename) {
	try {
		return fs.createReadStream(filename);
	} catch(e) {
		console.error(`ERROR: Could not open file: '${filename}'`);
		process.exit(1);
	}
}

function loadDict(joinKey, filename) {
	return new Promise((yay, nay) => {try {
		const ans = {};
		parseStream(createReadStream(filename))
		.on('jline', (data) => ans[data[joinKey]] = data)
		.on('error', (e) => nay(e))
		.on('end', () => yay(ans));
	} catch (e) { nay(e); }});
}

function set(d,k,v) {
	if (undefined !== v) d[k] = v;
	return d;
}

function extend(dict, newcomer) {
	return Object.keys(newcomer).reduce((d, k) => set(d, k, newcomer[k]), dict);
}

function combiDict(joinKey, filenames) {
	return Promise.all(filenames.map(filename => loadDict(joinKey, filename))).then(datasets => datasets.reduce(extend, {})).catch((e) => { console.error(e); process.exit(2); });
}
