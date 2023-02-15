const express = require("express");
const cors = require("cors");
const path = require('path');
const moment = require('moment');
const bodyparser = require('body-parser');
const fileupload = require("express-fileupload");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileupload());
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
    console.log(req.query)
    let text = req.query.searchtext;
    let gender = req.query.gender;
    let status = req.query.status;
    let hobbies = req.query.hobbies;
    let currentPage = req.query.currentPage;
    let dataPerPage = req.query.dataPerPage;
    let skipdata = currentPage*dataPerPage;
    let sortDate = req.query.sortDate;
    let sortName = req.query.sortName;
    let query = "";
    if (text != "") {
        query = `code like "%${text}%" or firstname like "%${text}%" or lastname like "%${text}%" or email like "%${text}%"`;
    }
    if (gender != "") {
        if (query != "") {
            query = query + ` and gender="${gender}" `;
        } else {
            query = `gender="${gender}"`;
        }
    }

    if (status != "") {
        if (query != "") {
            query = query + ` and status="${status}" `
        } else {
            query = `status="${status}"`;
        }
    }
    if (hobbies != "") {
        if (query != "") {
            query = query + ` and (hobbies like "%${hobbies}%") `
        } else {
            query = `(hobbies like "%${hobbies}%") `
        }
    }

    let order="";
    if(sortName!="" && sortDate!=""){
        order = ` order by firstname ${sortName}, dateadded ${sortDate} `;
    } else if(sortName!="") {
        order = ` order by firstname ${sortName} `;
    } else if(sortDate!=""){
        order = `order by dateadded ${sortDate} `;
    }
    if (query != "") {
        query = ` where ` + query;
    }
        query = query+order;
   
    dbConn.query(`select * from user_darshan ` + query + ` limit ${skipdata},${dataPerPage}`, (err, results) => {
        console.log(`select * from user_darshan ` + query + `limit ${skipdata},${dataPerPage}`)
        if (err) throw err;
            res.send(results)
    })
})

app.get('/total', (req, res) => {
    let query = `select count(*) as total from user_darshan`;
    dbConn.query(query, (err, results) => {
        if (err) throw err;
        console.log(results)
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
});

app.post('/status', (req, res) => {
    console.log(req.body);
    const date1 = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    let query = "";
    if (req.body.status == "Active") {
        let query = `Update user_darshan set status="Inactive", dateupdated="${date1}" where code="${req.body.code}"`;
        dbConn.query(query, (err, results) => {
            if (err) throw err;
            res.send({ data: results });
        })
    } else {
        let query = `Update user_darshan set status="Active", dateupdated="${date1}" where code="${req.body.code}"`;
        dbConn.query(query, (err, results) => {
            if (err) throw err;
            res.send({ data: results });
        })
    }
})

app.post('/delete', (req, res) => {
    console.log(req.body);
    const date1 = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        let query = `Update user_darshan set status="Inactive", endeffdt="${date1}" where code="${req.body.code}"`;
        dbConn.query(query, (err, results) => {
            if (err) throw err;
            res.send({ data: results });
        })
})

app.get('/total', (req, res) => {
    console.log(req.query)
    let text = req.query.searchtext;
    let gender = req.query.gender;
    let status = req.query.status;
    let hobbies = req.query.hobbies;
    let currentPage = req.query.currentPage;
    let dataPerPage = req.query.dataPerPage;
    let skipdata = currentPage*dataPerPage;
    let sortDate = req.query.sortDate;
    let sortName = req.query.sortName;
    let query = "";
    if (text != "") {
        query = `code like "%${text}%" or firstname like "%${text}%" or lastname like "%${text}%" or email like "%${text}%"`;
    }
    if (gender != "") {
        if (query != "") {
            query = query + ` and gender="${gender}" `;
        } else {
            query = `gender="${gender}"`;
        }
    }

    if (status != "") {
        if (query != "") {
            query = query + ` and status="${status}" `
        } else {
            query = `status="${status}"`;
        }
    }
    if (hobbies != "") {
        if (query != "") {
            query = query + ` and (hobbies like "%${hobbies}%") `
        } else {
            query = `(hobbies like "%${hobbies}%") `
        }
    }

    let order="";
    if(sortName!="" && sortDate!=""){
        order = ` order by firstname ${sortName}, dateadded ${sortDate} `;
    } else if(sortName!="") {
        order = ` order by firstname ${sortName} `;
    } else if(sortDate!=""){
        order = `order by dateadded ${sortDate} `;
    }
    if (query != "") {
        query = ` where ` + query;
    }
        query = query+order;
   
    dbConn.query(`select count(*) as total from user_darshan ` + query + ` limit ${skipdata},${dataPerPage}`, (err, results) => {
        console.log(`select * from user_darshan ` + query + `limit ${skipdata},${dataPerPage}`)
        if (err) throw err;
            res.send(results)
    })
})

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(8080, () => {
    console.log(`Server is running on port 8080.`);
});

