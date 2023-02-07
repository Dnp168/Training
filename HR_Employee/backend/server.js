const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

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

app.post('/addEmployee', (req, res) => {
    // console.log(req.body);
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let empid = req.body.empid;
    let mobile = req.body.mobile;
    let gender = req.body.gender;
    let address = req.body.address;
    let work_location = req.body.work_location;
    let ss_no = req.body.ss_no;
    let salary = req.body.salary;

    var query = `INSERT INTO employee_darshan (firstname, lastname, empid, mobile, address,work_location, gender, status) VALUES ("${firstname}","${lastname}","${empid}","${mobile}","${address}","${work_location}","${gender}",1)`;
    var query1 = `Insert into hr_darshan (ss_no,empid,salary) values("${ss_no}","${empid}","${salary}")`
    dbConn.query(query, function (err, results) {
        if (err) throw err;
        dbConn.query(query1, function (err, results) {
            if (err) throw err;
            return res.send({ data: results, message: 'Data Added successfully.' });
        })

    });
});

app.get('/getEmployeeData', (req, res) => {
    dbConn.query(`select * from employee_darshan where status=1`, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.post('/edit', (req, res) => {
    let id = req.body.id;
    dbConn.query(`select * from employee_darshan where id="${id}"`, (err, results) => {
        if (err) throw err;
        res.send(results);
        // console.log(results);
    })
})

app.post('/update', (req, res) => {
    // console.log(req.body);
    dbConn.query(`UPDATE employee_darshan SET firstname="${req.body.firstname}",lastname="${req.body.lastname}",mobile="${req.body.mobile}",address="${req.body.address}",work_location="${req.body.work_location}",gender="${req.body.gender}" where empid="${req.body.empid}"`, function (err, results) {
        if (err) throw err;
        res.send(results);
    })
});

app.post('/deleteEmployee', (req, res) => {
    // console.log(req.body)
    dbConn.query(`UPDATE employee_darshan SET status=0 where id="${req.body.ans}"`, function (err, results) {
        if (err) throw err;
        res.send(results);
    })
})

app.get('/getworklocation', (req, res) => {
    dbConn.query(`select * from location_darshan`, (err, results) => {
        if (err) throw err;
        res.send(results);

    })
})

app.get('/getOfficedata', (req, res) => {
    dbConn.query(`select * from location_darshan`, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.post('/addoffice', (req, res) => {
    // console.log(req.body);

    let building_id = req.body.building_id;
    let address = req.body.address;
    let zipcode = req.body.zipcode;
    let manager = req.body.manager;
    var query = `INSERT INTO location_darshan (building_id,  address,zipcode, manager) VALUES ("${building_id}","${address}","${zipcode}","${manager}")`;
    dbConn.query(query, function (err, results) {
        if (err) throw err;
        return res.send({ data: results, message: 'Data Added successfully.' });
    });
});

app.post('/editoffice', (req, res) => {
    let id = req.body.id;
    dbConn.query(`select * from location_darshan where id="${id}"`, (err, results) => {
        if (err) throw err;
        res.send(results);
        // console.log(results);
    })
});

app.post('/updateOffice', (req, res) => {
    // console.log(req.body);
    dbConn.query(`UPDATE location_darshan SET building_id="${req.body.building_id}", address="${req.body.address}",zipcode="${req.body.zipcode}", manager="${req.body.manager}" where id="${req.body.id}"`, function (err, results) {
        if (err) throw err;
        res.send(results);
    })
});

app.get('/gethrdata', (req, res) => {
    const query = `select firstname, lastname, empid, ss_no, salary from employee_darshan natural join hr_darshan;`;

    dbConn.query(query, (err, results) => {
        if (err) throw err;
        // console.log(results)
        res.send(results);
    })
})

app.post('/edithrdata', (req,res)=>{
    const query = `select firstname, lastname, empid, ss_no, salary from employee_darshan natural join hr_darshan where empid="${req.body.id}"`;
    dbConn.query(query, (err, results) => {
        if (err) throw err; 
        res.send(results);
    })
})

app.post('/Hrupdate', (req, res) => {
    console.log(req.body);
    dbConn.query(`UPDATE hr_darshan SET ss_no="${req.body.ss_no}",salary="${req.body.salary}" where empid="${req.body.empid}"`, function (err, results) {
        if (err) throw err;
        res.send(results);
    })
});

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(8001, () => {
    console.log(`Server is running on port 8001.`);
});