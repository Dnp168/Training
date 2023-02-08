import React, { useEffect, useState } from 'react'
import Header from './Header';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Recurtion from './Recurtion';

function ShowCategory() {
    // const [category, setCategory] = useState('');
    // const [name, setName] = useState("");
    // const [type, setType] = useState('');
    const navigate = useNavigate();
    const [ans, setAns] = useState('');


    function getdata() {
        axios.get("http://localhost:9001/parentdata").then((res) => {
            const ans = res.data;
            console.log(res.data);
            setAns(ans);
        })
    }

    useEffect(() => {
        getdata()
    }, []);

    return (
        <div>
            <Header />
            <h1>ShowCategory</h1>
            <br></br>
            <div>
                {
                    ans.length > 0 ? (
                        ans.map((item, index) => (
                            <Recurtion key={index} item={item} />   
                        ))
                    ) : <></>
                }

            </div>


        </div>
    )
}

export default ShowCategory;