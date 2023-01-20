import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Header({ setIsAdding}) {
    return (
        <header className="container">
            <center> <h1>React Js Curd Application</h1></center>
            <div style={{ marginTop: '30px', marginBottom: '18px' }}>
                <button style={{ marginLeft: '80%' }} onClick={() => setIsAdding(true)} className='btn btn-primary'>Add Employee</button> 
            </div>
        </header>
    )
}

export default Header;