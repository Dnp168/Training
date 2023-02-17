import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Qtyvalue({ item, changeTotal, changeQty }) {
    const [val, setVal] = useState(0);
    const [amount, setAmount] = useState(item.price);
    console.log(val,amount)

    useEffect(() => {
        changeQty(item.product_code,val,amount)
    }, [val,amount])

    function minusval() {
        if (val != 0) {
            setVal(val - 1);
            setAmount((val - 1) * item.price)
            changeTotal(-1 * item.price);
        }
    }
    function plusval() {
        setVal(val + 1);
        setAmount((val + 1) * item.price)
        changeTotal(item.price);
    }

    return (
        <tr key={item.id}>
            <td>{item.product_code}</td>
            <td>{item.name}</td>
            <td>{item.brand}</td>
            <td>{item.price}</td>
            <td><button onClick={minusval}>-</button>&nbsp;{val}&nbsp;<button onClick={plusval}>+</button></td>
            <td>{amount}</td>
        </tr>
    )
}

// function MyOrder({ setBtn, cart, total }) {
    

//     return (
//         <div>
//             <br></br>
//             <h2>My Order</h2>
//             <table>
//                 <tbody>
//                     <tr>
//                         <th>Product Code</th>
//                         <th> Name</th>
//                         <th>Price</th>
//                         <th>Qty</th>
//                         <th>Amount</th>
//                     </tr>
//                     {cart.length > 0 ? (
//                         cart.map((item, index) => (
//                             <tr key={index}>
//                                 <td>{item.product_code}</td>
//                                 <td>{item.name}</td>
//                                 <td>{item.price}</td>
//                                 <td>{item.qty}</td>
//                                 <td>{item.total}</td>
//                             </tr>
//                         ))
//                     ) : <></>
//                     }
//                     <tr>
//                         <td colspan="6" align='end' padding-right="40px">Grand Total :{total}</td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     )

// }

function Cart({ cart, setOnCart,id }) {
    const [total, setTotal] = useState(0);
    // const [btn, setBtn] = useState(false);
    const [cart1, setCart1] = useState(cart);
    const navigate  = useNavigate();
    // const [qty, setQty] = useState(0);
    // const [totalAmount, setTotalAmount] = useState(0);
    const userid=id;
    const changeQty = (id, qty, total) => {
        console.log(id, qty,total)
        setCart1(
            cart.map((item) => {
                if (item.product_code == id) {
                    item.qty = qty;
                    item.total = total;
                }
                return item;
            })
        );
    }
    const changeTotal = (amount) => {
        setTotal(total + amount);
    }

    const OrderDetails = () => {
        axios.post('http://localhost:9000/order',{cart1,total,userid}).then((res)=>{
        navigate('/orderdetail')
        })
    }

    useEffect(() => {
        console.log(cart);
    }, []);

    return (
        <div>
            <br></br>
            <center>
                <button onClick={() => { setOnCart(false) }}>Product</button>
                <br></br><br></br>
                {/* {btn ? <MyOrder
                    setBtn={setBtn}
                    cart={cart1}
                    total={total}

                    /> :
                    <> */}
                        <table border={{}}>
                            <tbody>
                                <tr>
                                    <th>Product Code</th>
                                    <th> Name</th>
                                    <th>Company</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Amount</th>
                                </tr>
                                {cart.length > 0 ? (
                                    cart.map((item) => (
                                        <Qtyvalue item={item} changeTotal={changeTotal} changeQty={changeQty}
                                        />
                                    ))
                                ) : <></>
                                }
                                <tr>
                                    <td colspan="6" align='end' padding-right="40px">Grand Total :{total}</td>
                                </tr>
                            </tbody>
                        </table>
                        <br></br>
                        <button onClick={OrderDetails}>MyOrder</button>
                        {/* </>} */}

            </center>
        </div>
    )
}

export default Cart;