import React, { useState, useEffect } from 'react'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function HrUpdate() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [empid, setEmpid] = useState('');
    const [ss_no, setSS_no] = useState('');
    const [salary, setSalary] = useState('');
    const id = localStorage.getItem("id");
    const navigate = useNavigate();
    const [ans, setAns] = useState([]);

    function back() {
        localStorage.clear();
        navigate("/Hr");
    }

    function editHrdata(){
        console.log(id);
        axios.post("http://localhost:8001/edithrdata", { id }).then((res) => {
            console.log(res.data[0]);
            const ans = res.data[0];
            setFirstname(ans.firstname);
            setLastname(ans.lastname);
            setEmpid(ans.empid);
            setSS_no(ans.ss_no)
            setSalary(ans.salary)
        });
    }
    useEffect(() => {
        editHrdata()
    }, []);

    function updateHr(event) {
        event.preventDefault();
        if(ss_no==""){
            alert("Enter Security Number")
        } else if(salary=="") {
            alert("Enter Your Salary")
        } else {
            axios.post("http://localhost:8001/Hrupdate", {  empid, ss_no, salary }).then((res) => {
                navigate("/Hr");
            });
        }

    }

    return (
        <div>
            <center>
                <h1>Update HR</h1>
            </center>
            <form onSubmit={updateHr}>
                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" className="form-control" disabled id="firstname" value={firstname} placeholder="Enter First Name" onChange={(e) => { setFirstname(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" className="form-control" disabled id="lastname" value={lastname} placeholder="Enter last Name" onChange={(e) => { setLastname(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="empid">Employee Id</label>
                    <input type="text" className="form-control" disabled id="empid" value={empid} placeholder="Enter Employee Id" onChange={(e) => { setEmpid(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="ss_no">Security Number</label>
                    <input type="text" className="form-control" id="ss_no" value={ss_no} placeholder="Enter Security Number" onChange={(e) => { setSS_no(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="salary">Salary</label>
                    <input type="number" className="form-control" id="salary" value={salary} placeholder="Enter Security Number" onChange={(e) => { setSalary(e.target.value) }} />
                </div>
                <br></br>
                <input type="submit" className="btn btn-primary" value="Update" /> &nbsp;
                <button className="btn btn-danger" onClick={back}>Back</button>
            </form>
        </div>
    )
}

export default HrUpdate;