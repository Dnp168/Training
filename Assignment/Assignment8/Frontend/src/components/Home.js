import React from "react";
import { Link } from 'react-router-dom';

function Home() {

    return (
        <div>
            <h1>Home Page</h1>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/Register">Register</Link>
                    </li>
                    <li>
                        <Link to="/Login">Login</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Home;