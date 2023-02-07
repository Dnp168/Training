import React, { useState, useEffect } from 'react'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function EditOffice() {
  const [building_id, setBuilding_id] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [manager, setManager] = useState('');
  const navigate = useNavigate();
  const pattern = new RegExp("[1-9]{1}[0-9]{5}")
  const id = localStorage.getItem("id");
  const [ans, setAns] = useState([]);

  function back() {
    localStorage.clear();
    navigate('/office');
  }

  function handleSubmit(event) {
    console.log(id);
    axios.post("http://localhost:8001/editoffice", { id }).then((res) => {
      console.log(res.data);
      const ans = res.data[0];
      setBuilding_id(ans.building_id);
      setAddress(ans.address);
      setZipcode(ans.zipcode);
      setManager(ans.manager);
    });
  }

  function updateOffice(event) {
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
      axios.post("http://localhost:8001/updateOffice", { id, building_id, address, zipcode, manager }).then((res) => {
        navigate("/office");
        localStorage.clear();
      });
    }

  }

  useEffect(() => {
    handleSubmit()
  }, []);

  return (
    <div>
      <center>
        <h1>Update Office</h1>
      </center>
      <form onSubmit={updateOffice}>
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

export default EditOffice;