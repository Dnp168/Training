import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';

function Header() {
    return (
        <>
            <div className='Header'>
                <h1>Amart</h1>
                <div className='link'>
                    <Link to="/"><button>Home</button></Link> &nbsp;
                    <Link to="/Register"><button>Register</button></Link> &nbsp;
                    <Link to="/login"><button>Login</button></Link>
                </div>
                
            </div>
        </>
    )
}

export default Header;