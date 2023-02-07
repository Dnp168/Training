import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function EmployeeData() {
    const [ans, setAns] = useState('');
    const navigate = useNavigate();

    function getProduct() {
        
        axios.get("http://localhost:8001/getEmployeeData").then((res) => {
            const ans = res.data;
            console.log(ans)
            setAns(ans);
        })
    }
    function Office() {
        navigate("/office");
    }
    function addEmployee() {
        navigate("/addEmployee");
    }

    useEffect(() => {
        getProduct()
    }, []);

    function editEmployee(ans) {
        navigate('/editEmployee')
        localStorage.setItem('id', ans.id);
    }

    function deleteEmployee(ans) {
        axios.post("http://localhost:8001/deleteEmployee",{ ans }).then((res) => {
            
        })
    }
    function hrdata(){
        navigate('/Hr') 
    }

    return (
        <div><center><h1>EmployeeData</h1></center>
            <div style={{ marginTop: '30px', marginBottom: '18px' }}>
                <button style={{ marginLeft: '75%' }} onClick={addEmployee} className='btn btn-primary'>Add Employee</button> &nbsp; <button onClick={Office} style={{ marginLeft: '0%' }}  className='btn btn-primary'>Office</button> &nbsp; <button onClick={hrdata} className='btn btn-primary'>Hr</button> 
            </div>
            <br></br>
            <table className="table table-bordered">
                <thead>
                    <tr >
                        <th>
                            No.
                        </th>
                        <th>
                            FirstName
                        </th>
                        <th>
                            LastName
                        </th>
                        <th>
                            Employee Id
                        </th>
                        <th>
                            Mobile
                        </th>
                        <th>
                            Address
                        </th>
                        <th>Work Location</th>
                        <th>
                            Gender
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {ans.length > 0 ? (ans
                        .map((item, index) => (
                            <tr key={item.id}>
                                <td>{index+1}</td>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.empid}</td>
                                <td>{item.mobile}</td>
                                <td>{item.address}</td>
                                <td>{item.work_location}</td>
                                <td>{item.gender} </td>
                                <td className="text-right">
                                    <button className="btn btn-primary" onClick={()=>{editEmployee(item)}}>Edit</button>
                                    &nbsp;
                                    <button className="btn btn-danger" onClick={()=>{deleteEmployee(item.id)}}> Delete </button>
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

export default EmployeeData;