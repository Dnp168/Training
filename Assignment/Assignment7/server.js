const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const mysql = require('mysql');
const dbConn = mysql.createConnection({
    host: '192.168.2.8',
    user: 'trainee',
    password: 'trainee@123',
    database: 'trainee'
});

dbConn.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});


app.post('/addbug', (req, res) => {
    console.log(req.body);
    let title = req.body.title;
    let description = req.body.description;
    let date = new Date();
    let Time = date.toLocaleTimeString();
    let Date1 = date.toJSON().slice(0, 10);
    let assignee = req.body.assignee;
    var query = `INSERT INTO bug_darshan (title, description, Time, Date, assignee) VALUES ("${title}","${description}","${Time}","${Date1}","${assignee}")`;
    dbConn.query(query, function (err, results) {
        if(err) throw err;
        return res.send({data: results, message: 'Data Added successfully.'});
    });
    
});

app.get('/getdata', (req, res) => {
    var query = `SELECT * from bug_darshan`;
    dbConn.query(query, function (err, results) {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(7000, () => {
    console.log(`Server is running on port 7000.`);
});