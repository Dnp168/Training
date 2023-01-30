const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
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

app.post('/add', function (req, res) {
    console.log(req.body);
    let name = req.body.name;
    let genre = req.body.genre;
    let rating = req.body.rating;
    let language = req.body.language;
    var query = `INSERT INTO movies_darshan (name, genre,rating,language) VALUES ("${name}", "${genre}", "${rating}", "${language}")`;
    dbConn.query(query, function (err, results) {
        if (err) throw err;
        return res.send({ data: results, message: 'Data Added successfully.' });
    });
});

app.get('/movies', function (req, res) {
    var query = `SELECT * from movies_darshan`;
    dbConn.query(query, function (err, results) {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/topmovies', function (req,res) {
    var query = `SELECT * from movies_darshan order by rating DESC limit 3`;
    dbConn.query(query, function (err, results) {
        if (err) throw err;
        res.json(results);
    });
});

app.put('/update', function (req,res) {
    console.log(req.body);
    let rating = req.body.rating;
    var query= `UPDATE movies_darshan SET rating="${rating}" WHERE genre="Comedy" `;
    dbConn.query(query, function (err, results) {
        if (err) throw err;
        return res.send({ data: results, message: 'Data Updated successfully.' });
    });
});

app.delete('/delete', function(req,res) {
    var query= `delete from movies_darshan order by rating asc limit 1`;
    dbConn.query(query, function (err, results) {
        if (err) throw err;
        return res.send({ data: results, message: 'Data Deleted successfully.' });
    });
});

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(6000, () => {
    console.log(`Server is running on port 6000.`);
});