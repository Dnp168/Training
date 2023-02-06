import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./header";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:9000/Login", { email: email, password: password }).then((res) => {
            console.log(res.data[0]);
            localStorage.setItem("key", res.data[0].accesstoken);
            localStorage.setItem("fname", res.data[0].firstname);
            localStorage.setItem("lname", res.data[0].lastname);
            navigate("/product");
        });
    }

    return (
        <div>
            <Header />
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