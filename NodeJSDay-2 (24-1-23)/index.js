var http = require('http');
var fs = require('fs');
const args = require('yargs').argv;
// http.createServer(function (req, res) {
//   //Open a file on the server and return its content:
//   fs.readFile('demo1.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
//   });
// }).listen(5000);

//create a file named mynewfile1.txt:
// fs.appendFile('demo2.txt', 'Hello content! ', function (err) {
//     if (err) throw err;
//     console.log('Saved!');
// });

// fs.open('demo2.txt', 'w', function (err, file) {
//     if (err) throw err;
//     console.log('Saved!');
// });

// fs.writeFile('demo2.txt', 'My name is Darshan', function (err) {
//     if (err) throw err;
//     console.log('Saved!');
//   });

// fs.unlink('demo2.txt', function (err) {
//     if (err) throw err;
//     console.log('File deleted!');
//   });

// fs.rename('demo4.txt', 'demo3.txt', function (err) {
//     if (err) throw err;
//     console.log('File Renamed!');
// });

