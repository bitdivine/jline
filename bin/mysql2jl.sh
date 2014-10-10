
jline-mysql2jla | jline-foreach 'if(recordNumber==1)global.headers = record;else{var d = {}; headers.forEach(function(name,index){d[name]=record[index];});console.log(JSON.stringify(d));}'


