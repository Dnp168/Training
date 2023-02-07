import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function Officedata() {
    const [ans, setAns] = useState('');
    const navigate = useNavigate();

    function getOfficedata() {

        axios.get("http://localhost:8001/getOfficedata").then((res) => {
            const ans = res.data;
            // console.log(ans)
            setAns(ans);
        })
    }

    useEffect(() => {
        getOfficedata()
    }, []);

    function Employee() {
        navigate("/");
    }

    function addOffice() {
        navigate("/addOffice");
    }

    function editOffice(ans) {
        navigate('/editOffice')
        localStorage.setItem('id', ans.id);
    }
    function hrdata(){
        navigate('/Hr') 
    }

    return (
        <div>
            <center><h1>Office Data</h1></center>
            <div style={{ marginTop: '30px', marginBottom: '18px' }}>
                <button style={{ marginLeft: '75%' }} onClick={addOffice} className='btn btn-primary'>Add Office</button> &nbsp; <button onClick={Employee} style={{ marginLeft: '0%' }} className='btn btn-primary'>Employees</button> &nbsp; <button onClick={hrdata} className='btn btn-primary'>Hr</button> 
            </div>
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th>No.</th>
                        <th>Building Id</th>
                        <th>Address</th>
                        <th>zipcode</th>
                        <th>Manager</th>
                        <th>Action</th>
                    </tr>
                    {
                        ans.length > 0 ? (
                            ans.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.building_id}</td>
                                    <td>{item.address}</td>
                                    <td>{item.zipcode}</td>
                                    <td>{item.manager}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => { editOffice(item) }}>Edit</button>
                                    </td>
                                </tr>
                            ))
                        ) : <></>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Officedata;