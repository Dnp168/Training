const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const Employees = require('./employee.json');
const Project = require('./project.json');

app.get("/employees", (req, res) => {
    res.json(Employees);
});

app.get("/employees/:Id", (req, res) => {
    console.log(req)
    let id = parseInt(req.params.Id);
    let findEmployee = Employees.filter((x) => x.id == id)[0];
    if (findEmployee) {
        res.json(findEmployee);
    } else {
        res.sendStatus(404);
    }
});

app.get("/project", (req, res) => {
    res.json(Project);
});

app.get("/project/:Id", (req, res) => {
    let id = parseInt(req.params.Id);
    let findProject = Project.filter((x) => x.projectid == id)[0];
    if (findProject) {
        res.json(findProject);
    } else {
        res.sendStatus(404);
    }
});

app.get("/getemployeedetails", (req, res) => {
    let employeeDetail = Employees.map((data) => {
        let project = Project.filter((x) => {
            return x.projectid == data.projectid;
        });
        if (project) {
            return { ...data, ...project }
        }
    });
    res.json(employeeDetail);
});

app.delete('/Delete/:Id', (req, res) => {
    let id = parseInt(req.params.Id);
    let deleteemployee = Employees.filter((x) => x.id == id);
	if (deleteemployee) {
		let Employee = Employees.filter((x) => x.id !== id);
        console.log(Employee);
        res.status(200).send("Student deleted sucessfully.");
	} else {
        res.status(404).send("Student does not exist");
	}
});

app.listen(5000, () => {
    console.log(`Server is running on port 5000.`);
});