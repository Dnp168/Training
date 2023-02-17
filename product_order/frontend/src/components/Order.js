import React, {useEffect, useState } from "react";
import axios from "axios";

function Order() {
    const userid = localStorage.getItem("id");
    const [ans, setAns] = useState([]);

    function orderDetail(){
        axios.get('http://localhost:9000/orderdetails',{params:{userid}}).then((res)=>{
            console.log(res.data.order);
            setAns(res.data.order)
        })
    }

    useEffect(() => {
        orderDetail()
    }, [])

    return (
        <div>
            Order table
            <br></br>
            <table>
                <thead>
                    <tr>
                        <th>OrderId</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {ans.length>0 ? 
                    ans.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.orderid}</td>
                            <td>{item.date}</td>
                            <td><button>view</button></td>
                        </tr>
                    ))
                    : <></>}
                </tbody>
            </table>
        </div>
    )
}

export default Order;