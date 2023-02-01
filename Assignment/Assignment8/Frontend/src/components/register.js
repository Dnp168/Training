import React, { useState } from "react";
import axios from "axios";

function Register() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [ans, setAns] = useState([]);

    function handleSubmit(event) {
        
        event.preventDefault();
        if(password==confirmpassword)
        {
            axios.post("http://localhost:8000/register", { firstname: firstname, lastname: lastname, email: email, password: password }).then((res) => {
            // const ans = res.data;
            // console.log(ans);
            // setAns(ans);
            console.log(res.data);
            setAns(res.data)
        });
        } else {
            alert("password not matched");
        }
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="row g-3">
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
                
                    <label  htmlFor="confirmpassword">Confirm Password: </label>
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
                <input type="submit" className="btn btn-primary"  value="Submit" />
                </center>
                {
                    ans.length !=0 ? <div><p>Data Added successfully.</p></div> : <></>
                }
            </form>
        </div>
    )
}

export default Register;

