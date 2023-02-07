import React, { useEffect, useState } from 'react'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function AddOffice() {
    const [building_id, setBuilding_id] = useState('');
    const [address, setAddress] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [manager, setManager] = useState('');
    const navigate = useNavigate();
    const pattern = new RegExp("[1-9]{1}[0-9]{5}")

    function back() {
        navigate("/office");
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (building_id == "") {
            alert("Enter Building Id")
            return false;
        } else if (address == "") {
            alert("Enter address")
            return false;
        } else if (zipcode == "") {
            alert("Enter Zipcode")
            return false;
        } else if (!pattern.test(zipcode)) {
            alert("Enter valid zipcode")
            return false;
        } else if (zipcode.length > 6 || zipcode.length < 6) {
            alert("Please Enter 6 digits zipcode")
        } else {
            axios.post("http://localhost:8001/addoffice", { building_id:building_id, address:address, zipcode:zipcode, manager:manager }).then((res) => {
                navigate("/");
            });
        }

    }

    return (
        <div>
            <center>
                <h1>Add Office</h1>
            </center>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="building_id">Building Id</label>
                    <input type="text" className="form-control" id="building_id" value={building_id} placeholder="Enter Building Id" onChange={(e) => { setBuilding_id(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="textbox" className="form-control" id="address" value={address} placeholder="Enter Address" onChange={(e) => { setAddress(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input type="text" className="form-control" id="zipcode" value={zipcode} placeholder="Enter zipcode" onChange={(e) => { setZipcode(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="manager">Manager</label>
                    <input type="text" className="form-control" id="manager" value={manager} placeholder="Enter Manager" onChange={(e) => { setManager(e.target.value) }} />
                </div>
                <br></br>
                <input type="submit" className="btn btn-primary" value="Submit" /> &nbsp;
                <button className="btn btn-danger" onClick={back}>Back</button>
            </form>
        </div>
    )
}

export default AddOffice;