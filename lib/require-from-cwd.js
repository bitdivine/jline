

var fs = require('fs');
var original_resolve = require.resolve;
var cwd = process.cwd();
var path = require('path');
function resolve(name){
	var ans;
	if (name.substr(0,1)==='.'){
		if (fs.existsSync(ans=path.join(cwd, name))) return ans;
		if (fs.existsSync(ans=path.join(cwd, name+'.js'))) return ans;
		if (fs.existsSync(ans=path.join(cwd, name+'.json'))) return ans;
	}
	return original_resolve(name);
}

function require_from_cwd(name){
	return require(resolve(name));
}

module.exports = require_from_cwd;
