import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import './Header.css';

function Header() {
    const navigate = useNavigate();
    function home(){
        navigate('/');
    }

    function category(){
        navigate('/category');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
            <a className="navbar-brand" href="#"><h3>Category Assignment</h3></a>&nbsp;&nbsp;&nbsp;
            <div id="home">
                <button className='btn btn-secondary' onClick={home}>Home</button> &nbsp;&nbsp;&nbsp;
                <button className='btn btn-secondary' onClick={category}>Category</button>
            </div>
        </nav>
    )
}

export default Header;