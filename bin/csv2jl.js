#!/usr/bin/env node


if(require.main === module) {
    if (process.argv[2] === '--help') {
        console.error(require('fs').readFileSync(__filename.replace(/.js$/,'.md'),{encoding:'utf8'}));
        process.exit(2);
    }

    var csv = require('ya-csv');
    var reader = csv.createCsvStreamReader(process.openStdin(), {
        'separator': ',',
        'quote': '"',
        'escape': '"',       
        'comment': '#',
    });
    var writer = csv.createCsvStreamWriter(process.stdout);
    var header = null;
    reader.addListener('data', function(data) {
        if ((!data)||(data.length===0)||((data.length===1)&&(data[0]===""))) return;
        if (header === null){
            header = data;
        } else {
            var record = {};
            header.forEach(function(key,index){record[key] = data[index];});
            console.log(JSON.stringify(record));
        }
    });
}
