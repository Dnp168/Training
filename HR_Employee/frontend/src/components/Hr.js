import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function Hr() {
    const [ans, setAns] = useState('');
    const navigate = useNavigate();

    function getHrData() {
        axios.get("http://localhost:8001/gethrdata").then((res) => {
            const ans = res.data;
            console.log(ans)
            setAns(ans);
        })
    }

    function Employee() {
        navigate("/");
    }
    function Office() {
        navigate("/office");
    }

    function editHr(ans) {
        navigate('/editHr')
        localStorage.setItem('id', ans.empid);
    }

    useEffect(() => {
        getHrData()
    }, []);

  return (
    <div>
        <center><h1>Hr Data</h1></center>
      
        <div style={{ marginTop: '30px', marginBottom: '18px' }}>
                <button style={{ marginLeft: '80%' }}  onClick={Employee} className='btn btn-primary'>Employees</button> &nbsp; <button onClick={Office} style={{ marginLeft: '0%' }}  className='btn btn-primary'>Office</button> 
            </div>
        <table className="table table-bordered">
            <tbody>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Employee Id</th>
                    <th>Sucrity No</th>
                    <th>Salary</th>
                    <th>Action</th>
                </tr>
                {
                    ans.length > 0 ? (
                        ans.map((item,index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.firstname + " " + item.lastname}</td>
                                <td>{item.empid}</td>
                                <td>{item.ss_no}</td>
                                <td>{item.salary}</td>
                                <td><button className="btn btn-primary" onClick={() => { editHr(item) }}>Edit</button></td>
                            </tr>
                        ))
                    ) : <></>
                }
            </tbody>

        </table>
    </div>
  )
}

export default Hr;