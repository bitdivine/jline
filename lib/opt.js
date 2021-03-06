var docopt = require('docopt').docopt;

function parse(vars){ // {filename:__filename, usage:'Usage: jline-clean [--version|--help|--man]'}
  vars = vars || {};
  var opts = docopt(vars.usage||"Usage: jline-clean [--version|--help]", {help:false});
  handle(opts,vars,[help,version]);
  return opts;
}

function help(opts, vars){
  if (opts['--help']) {
    console.log("\n"+vars.usage);
    console.log(require('fs').readFileSync(vars.filename.replace(/.js$/,'.md'),{encoding:'utf8'}));
    process.exit(2);
  }
}
function version(opts, vars){
  if (opts['--version']){
    console.log(require('../package.json').version);
    process.exit(2);
  }
}
function handle(opts, vars, handlers){
  handlers.forEach(function(handler){
    if(opts['--'+handler.name]) handler(opts, vars);
  });
}
function fancy(vars){
    var ans = parse(vars);
    process.stdout.on('error',process.exit);
    if(ans['-l'])console.log.apply(null,['#'].concat(process.argv.map(JSON.stringify)));
    return ans;
}

module.exports = 
{ parse:  parse
, handle: handle
, help:   help
, fancy:  fancy
, version:version
};

if (module === require.main){
  parse({filename:__filename});
}
