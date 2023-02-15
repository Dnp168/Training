import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { CSVLink } from 'react-csv';
// import Papa from "papaparse";

import './App.css';

function Showdata({ item, getData,index, view, edit, statuschange, delete1 }) {
    const [image, setImage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        let image = item.photo.split('/');
        setImage(image[image.length - 1]);

    }, [])



    return (
        <tr key={item.recid}>
            <td>{item.recid}</td>
            <td><img class='circular_image' src={`http://localhost:8080/getImage/${item.photo.split('/')[item.photo.split('/').length - 1]}`} alt={image} height="50px" width="50px" border-radius="50%" /></td>
            <td>{item.code}</td>
            <td>{item.firstname + " " + item.lastname}</td>
            <td>{item.email}</td>
            <td>{item.gender}</td>
            <td>{item.hobbies}</td>
            <td>{item.dateadded}</td>
            <td onClick={() => { statuschange(item.code, item.status) }} >{item.status == "Active" ? "Active" : "Inactive"}</td>
            <td><button className="btn btn-primary" onClick={() => { view(item.code) }}>View</button>&nbsp;
                <button className="btn btn-primary" onClick={() => { edit(item.code) }}>Edit</button>&nbsp;
                <button className="btn btn-danger" onClick={() => { delete1(item.code) }}>Delete</button>&nbsp;
            </td>
        </tr>
    )
}

function UserData() {

    // const [reload, setReload] = useState(false);
    const [ans, setAns] = useState([]);
    const [ans1, setAns1] = useState('');
    const [gender, setGender] = useState('');
    const [searchtext, setSearchtext] = useState('');
    const [status, setStatus] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [filter, setFilter] = useState(false);
    const [fileData, setFileData] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [dataPerPage, setdataPerPage] = useState(3);
    const [sortDate, setSortDate] = useState('');
    const [sortName, setSortName] = useState('');
    const allowedExtensions = ["csv"];
    // const [error, setError] = useState("");
    const [file, setFile] = useState("");
    // const [data, setData] = useState([]);
    // const [import1, setImport] = useState(false)
    // const [totalpage, setTotalpage] = useState(2);
    const [total2, setTotal] = useState(0);
    const navigate = useNavigate();
    const headers = [
        { label: "Code", key: "code" },
        { label: "Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Gender", key: "gender" },
        { label: "Hobbies", key: "hobbies" },
        { label: "Status", key: "status" },
        { label: "DateAdded", key: "dateadded" },
        { label: "DateUpdated", key: "dateupdated" },
    ];
    useEffect(() => {
        getData();
    }, [currentPage])
    const CSV = (ans) => {
        let Ans = []
        ans.map((item) => {
            console.log(item);
            const json = {};
            json.code = item.code;
            json.name = item.firstname + "" + item.lastname;
            json.email = item.email;
            json.gender = item.gender;
            json.hobbies = item.hobbies;
            json.status = item.status1 == "Active" ? "Active" : "Inactive";
            json.dateadded = item.dateadded;
            json.dateupdated = item.dateupdated;
            Ans.push(json);
        });
        console.log(Ans);
        setFileData(Ans);
    };

    const delete1 = (code) => {
        if(window.confirm('Are you sure you wish to delete this user')==true){
            axios.post("http://localhost:8080/delete", { code }).then((res) => {
                getData()
            })
        } else {
            getData()
        }
       
    }

    const view = (code) => {
        localStorage.setItem('code', code)
        navigate('/view');
    }

    const edit = (code) => {
        localStorage.setItem('code', code)
        navigate('/edit');
    }

    const statuschange = (code, status) => {
        axios.post("http://localhost:8080/status", { code, status }).then((res) => {
            getData()
        })
    }

    function getData() {
        
        axios.get("http://localhost:8080/getdata", { params: { searchtext: searchtext, gender: gender, status: status, hobbies: hobbies, currentPage, dataPerPage,sortDate,sortName } }).then((res) => {
            const ans = res.data;
            console.log(ans)
            setAns(ans);
            CSV(ans)
        })

        
    }

    function total() {
        axios.get("http://localhost:8080/total", { params: { searchtext: searchtext, gender: gender, status: status, hobbies: hobbies, currentPage, dataPerPage,sortDate,sortName } }).then((res) => {
            const ans = res.data[0].total;
            console.log(ans)
            setAns1(ans);
          
        }) 
    }

    function reset() {
        setSearchtext("")
        setGender("")
        setHobbies("")
        setStatus("")
        setSortDate("")
        setSortName("")
        axios.get("http://localhost:8080/getdata", { params: { searchtext: "", gender: "", status: "", hobbies: "", currentPage, dataPerPage,sortDate,sortName } }).then((res) => {
            const ans = res.data;
            console.log(ans)
            setAns(ans);
            CSV(ans)
        })
        setFilter(false);
    }

    const nextbtn = () => {
        setCurrentPage(currentPage + 1);
        getData()
    }
    const backbtn = () => {
        setCurrentPage(currentPage - 1);
        getData()
    }

    const nameChange = () =>{
        if(sortName==""){
            setSortName("ASC");
            getData()
        }else if(sortName=="ASC"){
            setSortName("DESC");
            getData()
        }else{
            setSortName("ASC");
            getData()
        }
    }

    const dateChange = () =>{
        if(sortDate==""){
            setSortDate("ASC");
            getData()
        }else if(sortDate=="ASC"){
            setSortDate("DESC");
            getData()
        }else{
            setSortDate("ASC");
            getData()
        }
    }
    useEffect(() => {
        total()
          

    }, [fileData]);
    useEffect(() => {
        const total1 = Math.ceil(ans1/dataPerPage);
        console.log(total1)
          setTotal(total1);
    }, []);
    
    return (
        <div>
            <center><h2>User Data</h2></center>
            <div className="filter">
                {filter ? <div style={{ marginLeft: '0%' }}>
                    <input style={{ marginLeft: '%' }} type="text" id="search" value={searchtext} name="search" placeholder="Search Here" onChange={(e) => { setSearchtext(e.target.value) }} /> <br></br>
                    <label htmlFor="gender">Gender : </label>&nbsp;
                    <input id="male" type="radio" name="gender" value="male" onChange={(e) => { setGender(e.target.value) }} />
                    <label htmlFor="male" className='px-2'>Male</label>&nbsp;
                    <input id="female" type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} />
                    <label htmlFor="female" className='px-2' >Female</label><br></br>
                    <label htmlFor="country">Status: </label>&nbsp;
                    <select
                        id="status" type="text" name="status" value={status} onChange={e => { setStatus(e.target.value) }} >
                        <option value="All">All</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <br></br>
                    <label htmlFor="hobbies">Hobbies: </label>&nbsp;
                    <select
                        id="hobbies" type="text" name="hobbies" value={hobbies} onChange={e => { setHobbies(e.target.value) }} >
                        <option value="All">All</option>
                        <option value="Reading">Reading</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Coding">Coding</option>
                        <option value="Drawing">Drawing</option>
                    </select>
                    <br></br>
                    <button className='btn btn-secondary' onClick={getData}>Filter Data</button> &nbsp;
                    <button className='btn btn-secondary' onClick={reset} >Reset</button>
                </div>
                    :
                    <button className="btn btn-secondary" onClick={() => { setFilter(true) }}>Filter</button>
                }


                <div >
                    <button > {fileData?.length &&
                        <CSVLink
                            headers={headers}
                            data={fileData}
                            target="_blank"
                        >
                            Export
                        </CSVLink>
                    }</button>&nbsp;&nbsp;

            {/* {  import1 ?    <div>
            <label htmlFor="csvInput" style={{ display: "block" }}>
                Enter CSV File
            </label>
            <input
                onChange={handleFileChange}
                id="csvInput"
                name="file"
                type="File"
            />
            <div>
                <button className="btn btn-secondary" onClick={handleParse}>Parse</button>
            </div>
            </div> : } */}
            <button className="btn btn-secondary" onClick={()=>{navigate('/import')}}>import</button> 
                    &nbsp;
                    &nbsp;
                    <button className='btn btn-primary' onClick={() => { navigate('/addUser') }}>Add User</button>
                </div>
            </div>
            <br></br>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Image</th>
                        <th>Code</th>
                        <th onClick={nameChange}>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Hobbies</th>
                        <th onClick={dateChange}>Date_Added</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        ans.map((item,index) => (
                            <Showdata item={item} index={index} delete1={delete1} getData={getData} view={view} edit={edit} statuschange={statuschange} />
                        ))
                    }
                </tbody>
            </table>
            <div className="pagination">
                <div style={{ marginLeft: "3%" }}>
                    {currentPage != 0 ? <button className="btn btn-secondary" onClick={backbtn}>Back</button> : <></>}
                </div>
                <div style={{ marginLeft: "86%" }}>
                    {currentPage+1==total2 ?  <></> :<button onClick={nextbtn} className="btn btn-secondary" >Next</button> }
                </div>
            </div>
            <br></br>
            
        </div>
    )
}

export default UserData;