import React, { useState } from "react";
import axios from "axios";

function Assignment5() {
    const [ans, setAns] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.get("http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees").then((res) => {
            const ans = res.data;
            console.log(ans);
            setAns(ans);
        });
    }
 
    return (
        <>        
        <form onSubmit={handleSubmit}>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>createdAt</th>
                    </tr>
                </thead>
                <tbody>
                   {
                    ans.length!=0 ?(ans
                        .map((emp) => (
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.name}</td>
                                <td>{emp.createdAt}</td>
                            </tr>
                        ))
                     ) :
                        <></>
                   }
                </tbody>
            </table>
             <input type="submit" value="Get Data" />
        </form>
        </>

    )
}

export default Assignment5;