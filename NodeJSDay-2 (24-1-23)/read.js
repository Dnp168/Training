const fs = require("fs");
fs.readFile('deep.txt', 'utf8', function(err, data){
    if(err) throw err;
    console.log(data);
    return data;
});