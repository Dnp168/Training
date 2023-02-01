const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
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

app.post('/register', (req, res) => {
    console.log(req.body);
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
    let name = jwt.sign(email, 'darshan');
    let date = new Date();
    let Date1 = date.toJSON().slice(0, 10);
    var query = `INSERT INTO register_darshan (firstname, lastname, email, password, accesstoken, dateadded) VALUES ("${firstname}","${lastname}","${email}","${password}","${name}","${Date1}")`;
    dbConn.query(query, function (err, results) {
        if (err) throw err;
        return res.send({ data: results, message: 'Data Added successfully.' });
    });
});



app.post('/Login', (req, res) => {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    // let name = jwt.sign(email, 'darshan');
    if (email && password) {
        let query = `SELECT * FROM register_darshan where email = "${email}"`;
        dbConn.query(query, function (err, results) {
            if (err) throw err;
            if (results.length > 0) {
                for (var count = 0; count < results.length; count++) {
                    if (results[count].password == password) {
                        dbConn.query(`SELECT accesstoken FROM register_darshan where email = "${email}"`, function(err, results) {
                            if (err) throw err;
                            res.send(results);
                        })
                    } else {
                        console.log("Invalid Password")
                       return res.send("Invalid Password");
                    }
                }
            } else {
                console.log("Invalid Email");
                return res.send("Invalid Email Address");
            }
        });
    }
});

app.post('/gettoken', (req, res) =>{

})


app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});