import React, { useState, useEffect } from 'react'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function EditEmployee() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [empid, setEmpid] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [work_location, setWork_Location] = useState('');
    const pattern = new RegExp("[1-9]{1}[0-9]{9}")
    const navigate = useNavigate();
    const id = localStorage.getItem("id");
    const [ans, setAns] = useState([]);

    function back() {
        localStorage.clear();
        navigate('/');
    }

    function handleSubmit(event) {
        console.log(id);
        axios.post("http://localhost:8001/edit", { id }).then((res) => {
            console.log(res.data[0]);
            const ans = res.data[0];
            setFirstname(ans.firstname);
            setLastname(ans.lastname);
            setEmpid(ans.empid);
            setMobile(ans.mobile);
            setGender(ans.gender);
            setAddress(ans.address);
            setWork_Location(ans.work_location);
        });
    }

    function updateEmployee(event) {
        event.preventDefault();
        if (firstname == "") {
            alert("Enter First name")
            console.log("first name")
            return false;
        } else if (lastname == "") {
            alert("Enter Last name")
            return false;
        } else if (empid == "") {
            alert("Enter the emp id")
            return false;
        } else if (mobile == "") {
            alert("Enter Mobile Number")
            return false;
        } else if (!pattern.test(mobile)) {
            alert("Enter valid mobile number")
            return false;
        } else if (mobile.length > 10 || mobile.length < 10) {
            alert("Please Enter 10 digits mobile number")
        } else if (address == "") {
            alert("Enter Address")
        } else if (gender == "") {
            alert("Please select your gender")
        }
        else {
            axios.post("http://localhost:8001/update", { firstname, lastname, empid, mobile, gender, address, work_location }).then((res) => {

                navigate("/");
            });
        }
    }

    function getlocation(){
        axios.get("http://localhost:8001/getworklocation").then((res) => {
            const ans = res.data;
            console.log(res.data);
            setAns(ans);
        })
      }

    useEffect(() => {
        handleSubmit()
      getlocation()
    }, []);

    useEffect(() => {

    }, [ans]);

    return (
        <div>
            <center>
                <h1>Update Employee</h1>
            </center>
            <form onSubmit={updateEmployee}>
                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" className="form-control" id="firstname" value={firstname} placeholder="Enter First Name" onChange={(e) => { setFirstname(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" className="form-control" id="lastname" value={lastname} placeholder="Enter last Name" onChange={(e) => { setLastname(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="empid">Employee Id</label>
                    <input type="text" disabled className="form-control" id="empid" value={empid} placeholder="Enter Employee Id" onChange={(e) => { setEmpid(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" className="form-control" id="mobile" value={mobile} placeholder="Enter Mobile Number" onChange={(e) => { setMobile(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="textbox" className="form-control" id="address" value={address} placeholder="Enter Your Address" onChange={(e) => { setAddress(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="work_location">Work_location</label>
                    <select
                        id="work_location" class="form-select form-select-sm"
                        type="text"
                        name="work_location"
                        value={work_location}
                        onChange={e => { setWork_Location(e.target.value);
                         console.log(e.target.value) }} >
                            <option value="gand">6ed</option>
                            {
                                ans.length > 0  ? (
                                ans.map((item) => 
                                <option value={item.building_id} >{item.building_id}</option>
                                )) :
                                <></>
                            }

                        </select>
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="gender">Gender: </label>&nbsp;
                    <input
                        id="male"
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={(e) => { setGender(e.target.value) }}
                        checked={gender == "male" ? "true" : null}
                    /> 
                    <label htmlFor="male" className='px-2'>Male</label>
                    &nbsp;
                    <input
                        id="female"
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={(e) => setGender(e.target.value)}
                        checked={gender == "female" ? "true" : null}
                    />
                    <label htmlFor="female" className='px-2'>Female</label>
                </div>
                <br></br>
                <input type="submit" className="btn btn-primary" value="Submit" /> &nbsp;
                <button className="btn btn-danger" onClick={back}>Back</button>
            </form>
        </div>
    )
}

export default EditEmployee;