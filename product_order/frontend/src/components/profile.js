import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Profile() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem("key");
    const [ans, setAns] = useState([]);

    function cancel() {
        navigate("/product");
    }

    function getdata(evevt) {
        axios.post("http://localhost:9000/profile", { token }).then((res) => {
            console.log(res.data[0]);
            const ans = res.data[0];
            setFirstName(ans.firstname);
            setLastName(ans.lastname);
            setEmail(ans.email);
            setPassword(ans.password);
            setMobile(ans.mobile);
            setGender(ans.gender);
            setAddress(ans.address);
            setDob(ans.dob.slice(0, 10));
        })
    }
    
    function update(event){
        event.preventDefault();
        axios.post("http://localhost:9000/update",{firstname,lastname,email,password,mobile,gender,address,dob}).then((res) => {
            navigate("/product");
        });
    }

    useEffect(() => {
        getdata()
    }, []);

    useEffect(() => {

    }, [ans]);

    return (
        <div>

            <form className="row g-3" onSubmit={update}>
                <center><h1>Update Profile</h1>
                    <label htmlFor="firstname" className="form-label">First Name: </label>
                    <input
                        id="firstname"
                        type="text"
                        name="firstname"
                        value={firstname}
                        onChange={(e) => { setFirstName(e.target.value) }}
                        required
                    />
                    <br></br>
                    <br></br>
                    <label htmlFor="lastname" className="form-label">Last Name: </label>
                    <input
                        id="lastname"
                        type="text"
                        name="lastname"
                        value={lastname}
                        onChange={(e) => { setLastName(e.target.value) }}
                        required
                    />

                    <br></br>
                    <br></br>

                    <label className="form-label" htmlFor="email">Email: </label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        value={email}
                        onChange={e => { setEmail(e.target.value) }}
                        required
                        disabled
                    />
                    <br></br>
                    <br></br>

                    <label className="form-label" htmlFor="password">Password: </label>
                    <input
                        id="password"
                        type="text"
                        name="password"
                        value={password}
                        onChange={e => { setPassword(e.target.value) }}
                        required
                    />
                    <br></br>
                    <br></br>
                    <label htmlFor="mobile">Mobile: </label>
                    <input
                        id="mobile"
                        type="number"
                        name="mobile"
                        value={mobile}
                        onChange={e => { setMobile(e.target.value) }}
                        required
                    />
                    <br></br>
                    <br></br>
                    <div >
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
                    <label htmlFor="address">Address: </label>
                    <textarea id="address" name="address" value={address} rows="3" cols="30" required onChange={e => { setAddress(e.target.value) }}></textarea>
                    <br></br>
                    <br></br>
                    <label htmlFor="dob">DOB: </label>
                    <input type="date" required id="dob" name="dob" value={dob} onChange={e => { setDob(e.target.value) }} />
                    <br></br>
                    <br></br>
                    <input type="submit" className="btn btn-primary" value="Update" /> &nbsp;
                    <button onClick={cancel}>Cancel</button>
                </center>
            </form>

        </div>
    )
}

export default Profile;
