import React, { useState , useEffect} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

function Assignment7() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // const [time, setTime] = useState('');
    // const [date, setDate] = useState('');
    const [assignee, setAssignee] = useState('');
    const [ans, setAns] = useState([]);

    useEffect (()=> {
        getdata()
    },[])

    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:7000/addbug", { title: title, description: description, assignee: assignee }).then((res) => {
            // const ans = res.data;
            // console.log(ans);
            // setAns(ans);
        });
    }

    function getdata() {
        axios.get("http://localhost:7000/getdata").then((res) => {
            console.log(res.data);
            const ans=res.data
            setAns(ans);
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <center><h1>Add Bug</h1></center>
                <div className="col">
                    <label htmlFor="title">Title: </label>
                    <input
                        className="form-control"
                        id="title"
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="col">
                    <label htmlFor="description">Description: </label>
                    <input
                        className="form-control"
                        id="description"
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </div>
                <div className="col">
                    <label htmlFor="assignee">Assignee: </label>
                    <input
                        className="form-control"
                        id="assignee"
                        type="text"
                        name="assignee"
                        value={assignee}
                        onChange={(e) => { setAssignee(e.target.value) }}
                    />
                </div>
                <input type="submit" value="Submit" />
            
            <br></br>
            <br></br>
            
        
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Time</th>
                                <th>Date</th>
                                <th>Assignee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ans.length >0 ? (
                                    ans.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.description}</td>
                                            <td>{item.Time}</td>
                                            <td>{item.Date}</td>
                                            <td>{item.assignee}</td>
                                        </tr>
                                    ))
                                )
                                 : <></>
                            }
                        </tbody>
                    </table>
                </form>
          
        </>

    )
}

export default Assignment7;