import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Header.css';

function Product_Header() {
    const navigate = useNavigate();
    const fname=localStorage.getItem("fname");
    const lname=localStorage.getItem("lname");
    function logout() {
        localStorage.clear();
        navigate("/");
    }
    function profile() {
        
        navigate("/profile");
    }
    return (
        <>
            <div className='Header'>
                <h1>Amart</h1>
                <h2>{fname} &nbsp; {lname}</h2>
                <div className='link'>
                    <Link to="/product"><button>Home</button></Link> &nbsp;
                    <button onClick={profile}>Profile</button> &nbsp;
                    <button onClick={logout}>Logout</button>
                </div>
                
            </div>
        </>
    )
}

export default Product_Header;