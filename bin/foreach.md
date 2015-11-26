jline-foreach
=============

Execute a function for each JSON line.  This is roughly equivalent to gawk for JSON lines.

## Command line:

    echo '{"this":24, "that":99}' | jline-foreach "console.log(record.this * record.that);"
    echo '{"a":5}' | jline-foreach 'sum += record.a;' 'end::console.log(sum);' 'beginning::GLOBAL.sum=0;'
    echo '{"a":"man"}' | jline-foreach 'console.log(require("fs").readFileSync(record.a));'

### Code

The flags are:

* `-q` - quiet - don't pass comments through.

* `-l` - log - start the output with a comment giving this command

Each argument is of the form: "event::code".  If the event is omitted it is assumed to be `jline`.  Others are:

* `beginning`/`beg`/`begin`

* `end`

* `error`

* `line` - any line, well formed or not.

The only way to share variables between separate chunks of code is to declare them global.


The preset variables are:

* `record` - the parsed JSON.

* `recordNumber` - the line number, excluding lines that are not well formed JSON.

* `line` - the raw string

* `lineNumber` - the line number.

* `error` - (when handling an error event)

All standard nodejs functions are available and in addition:

* `emit(data)` - emits a JSON line on stdout.

* `require(path)` - looks in the current working directory first for relative paths.

* `keyvals(dict, callback(key,val))` - iterates over a dictionary.

* `setpath(dict, [x1,x2,x3,...],val)` - sets `dict.x1.x2.x3=val`, creating any intermediate objects as necessary.

* `getpath(dict, [x1,x2,x3,...])` - returns `dict.x1.x2.x3` or `undefined`

* `find(dict,{options},callback(path,value){....})`  Find all paths in a dictionary.  Useful for converting trees into tabular form.  Options are: `{maxdepth:3,prefix:["each","row","starts","with"]}`

* `tm` - the tree-math library.

### Require Modules
You can `require` any npm modules in your NODE_PATH.  For example:

    # First install a module; it doesn't matter where.
    # I'll install one globally:
    $ sudo npm install -g request-promise
    ...
    # For me the global modules are here:
    $ ls /usr/local/lib/node_modules/ | grep request-promise
    request-promise
    # Yours are probably in:
    $ here "$(npm config get prefix)/lib/node_modules"
    #
    # Now use that module:
    #
    $ export NODE_PATH="/usr/local/lib/node_modules/"
    $ echo '{"url":"http://winning.gold"}' | jline-foreach 'beg::req=require("request-promise")' 'req(record.url).then(console.log)'
    <html>
    <head>
    ...

Here is another example.  MongoDB has no good way of upserting fields from the command line.  But there is a node module for that:

    echo '{"page":"index.html","hour":"2015-09-18T21:00:00Z","visitors":1001}' |\
    jline-foreach \
        'beg::dp=require("bluebird").promisifyAll(require("mongodb").MongoClient).connectAsync("mongodb://localhost:27017/nginx")' \
        'dp.then(function(db){
           updates = {}
           updates["visitors.hour."+record.hour] = record.visitors;
           db.collection("pagestats").update({_id:record.page},{$set:updates},{upsert:true});});' \
        'end::dp.then(function(db){db.close()})'


