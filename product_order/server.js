const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const fs = require("fs");
const { readFileSync } = require('fs');
// const users = require("./order.json");
// const jwt_decode = require("jwt-decode");
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

app.post('/register', (req, res) => {
    console.log(req.body);
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
    let mobile = req.body.mobile;
    let gender = req.body.gender;
    let address = req.body.address;
    let dob = req.body.dob;
    let name = jwt.sign(email, 'darshan');
    var query = `INSERT INTO register_1 (firstname, lastname, email, password, mobile, gender, address, dob, accesstoken) VALUES ("${firstname}","${lastname}","${email}","${password}","${mobile}","${gender}","${address}","${dob}","${name}")`;
    dbConn.query(query, function (err, results) {
        if (err) throw err;
        return res.send({ data: results, message: 'Data Added successfully.' });
    });
});


app.post('/Login', (req, res) => {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    let name = jwt.sign(email, 'darshan');
    if (email && password) {
        let query = `SELECT * FROM register_1 where email = "${email}"`;
        dbConn.query(query, function (err, results) {

            if (results.length > 0) {
                for (var count = 0; count < results.length; count++) {
                    if (results[count].password == password) {

                        dbConn.query(`Update register_1 SET accesstoken="${name}" where email = "${email}"`, function (err, results) {

                            dbConn.query(`select id,firstname,lastname,accesstoken from register_1 where email = "${email}"`, function (err, results) {
                                res.send(results);
                            });

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

app.post('/profile', async (req, res) => {
    console.log(req.body.token);
    try{
        const ans =await resolveToken(req.body.token);
        dbConn.query(`select * from register_1 where email="${ans}"`, function(err, results) {
            if(err) throw err;
            res.send(results);
            console.log(results)
        })
    }catch(err){
        res.send("error");
    }
})

app.post('/update',  (req,res)=>{
    console.log(req.body);
    dbConn.query(`UPDATE register_1 SET firstname="${req.body.firstname}",lastname="${req.body.lastname}",password="${req.body.password}",mobile="${req.body.mobile}",gender="${req.body.gender}",address="${req.body.address}",dob="${req.body.dob}" where email="${req.body.email}"`, function (err, results) {
        if(err) throw err;
        res.send(results);
    })
});

app.get('/getproduct', (req,res)=>{
    dbConn.query(`select * from product_1`, (err, results)=>{
        if(err) throw err;
        res.send(results);
    })
})

app.post('/order',(req,res)=>{
    // console.log(req.body);
    const ans = req.body.cart1;
    const grandtotal = req.body.total;
    const date = new Date();
    const userid = req.body.userid;
    // console.log(ans)
    const id = 'ORD' + Math.floor(Math.random() * 1000);
    var obj = {
        ans,
        orderid: id,
        grandtotal: grandtotal,
        date:date,
        userid:userid
    };
    // ans.push(orderid: id,grandtotal:grandtotal);
    console.log(ans)
    fs.readFile('order.json',(err,data)=>{
        if(err){
            console.log(err);
        } else {
            const users = JSON.parse(data);
            // users.order.push(id);
            users.order.push(obj)
            fs.writeFile('order.json', JSON.stringify(users),err => {
     
                // Checking for errors
                if (err) throw err; 
               
                res.status(200).send("done");
            });
        }
    })
    
})

app.get('/orderdetails',(req,res)=>{
    console.log(req.query.userid)
    const userid = req.query.userid;
    const results = readFileSync('order.json');
    
    res.send(results)
})

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(9000, () => {
    console.log(`Server is running on port 9000.`);
});


const resolveToken = (token) => { 
    console.log("token : ", token); 
    return new Promise((resolve, reject) => { 
        jwt.verify(token, "darshan", function (err, decoded) { 
            if (err) reject(err); 
            console.log(decoded); 
            resolve(decoded); 
        }); 
    }); 
};


