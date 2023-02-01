import React, { useState } from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:8000/Login", { email: email, password: password }).then((res) => {
            console.log(res.data[0]);
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <center><h1>Login</h1>
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
                    <center><input type="submit" className="btn btn-primary" value="Submit" /></center>
                </center>
            </form>
          
        </div>
    )
}

export default Login;