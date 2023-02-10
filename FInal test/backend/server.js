const express = require("express");
const cors = require("cors");
// const multer = require('multer');
const path = require('path');
const moment = require('moment');
const bodyparser = require('body-parser');
const fileupload = require("express-fileupload");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileupload());
// app.use(express.static(__dirname + '/public/images'));
app.use(express.static(path.join(__dirname + 'public/images')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

const mysql = require('mysql');
const dbConn = mysql.createConnection({
    host: '192.168.2.8',
    user: 'trainee',
    password: 'trainee@123',
    database: 'trainee',
    timezone: 'utc'
});

dbConn.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});

// var storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, './public/images/')     // './public/images/' directory name where save the file
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })
// var upload = multer({
//     storage: storage
// });

app.post('/addUser', (req, res) => {
    console.log(req.body);
    const file = req.files.file;
    file.mv(`./public/images/${req.body.fileName}`, (err) => {
        if (err) throw err;
        res.status(200).send({ message: `./src/images/${req.body.fileName}`, code: 200 });
    });
})


app.post('/add', (req, res) => {
    console.log(req.body);
    var hobbie = "";
    var newhobiie = hobbie + req.body.hobbies;
    var date = new Date();
    const date1 = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    console.log(date1);
    var imgsrc = './public/images/' + req.body.fileName
    let query = `Insert into user_darshan (code,firstname,lastname,email,gender,hobbies,photo,country,status,dateadded) values 
     ("${req.body.code}","${req.body.firstname}","${req.body.lastname}","${req.body.email}","${req.body.gender}","${newhobiie}","${imgsrc}","${req.body.country}","Active","${date1}")`;
    dbConn.query(query, (err, results) => {
        if (err) throw err;
        res.send({ data: results });
    })
})

app.get('/getdata', (req, res) => {
    let query = `select * from user_darshan where status="Active"`;
    dbConn.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.post('/viewData', (req, res) => {
    console.log(req.body);
    let query = `select * from user_darshan where code = "${req.body.id}" `;
    dbConn.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.get("/getImage/:Id", async (req, res) => {
    res.set('Content-Type', 'image/jpg');
    const data = fs.readFileSync(`./public/images/${req.params.Id}`);
    res.send(data);
})

app.post('/updateUser', (req, res) => {
    console.log(req.body);
    var hobbie = "";
    var newhobiie = hobbie + req.body.hobbies;
    const date1 = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    console.log(date1);
    var imgsrc = './public/images/' + req.body.fileName;
    let query = `UPDATE user_darshan SET firstname="${req.body.firstname}", lastname="${req.body.lastname}", email="${req.body.email}",
    gender="${req.body.gender}", hobbies="${newhobiie}",photo="${imgsrc}", country="${req.body.country}", dateupdated="${date1}" where code="${req.body.code}"`;
    dbConn.query(query, (err, results) => {
        if (err) throw err;
        res.send({ data: results });
    })
})

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(8080, () => {
    console.log(`Server is running on port 8080.`);
});

