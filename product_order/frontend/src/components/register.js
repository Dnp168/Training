import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./header";
function Register() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    // const [ans, setAns] = useState([]);
    const navigate = useNavigate();

    function handleSubmit(event) {

        event.preventDefault();
        if(password===confirmpassword)
        {
            axios.post("http://localhost:9000/register", { firstname: firstname, lastname: lastname, email: email, password: password, mobile: mobile, gender: gender, address: address, dob: dob }).then((res) => {
            // const ans = res.data.message;
            // console.log(ans);
            // setAns(ans);
            navigate("/Login");
            
        });
        } else {
            alert("password not matched");
        }

    }

    return (
        <div>
            <Header />
            <form className="row g-3" onSubmit={handleSubmit}>
                <center><h1>Register</h1>

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

                    <label htmlFor="confirmpassword">Confirm Password: </label>
                    <input
                        id="confirmpassword"
                        type="text"
                        name="confirmpassword"
                        value={confirmpassword}
                        onChange={e => { setConfirmPassword(e.target.value) }}
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
                    <input type="submit" className="btn btn-primary" value="Submit" />
                </center>
            </form>
            {/* {ans.length > 0 ? ans : <></>} */}
        </div>
    )
}

export default Register;

