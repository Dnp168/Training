import React, { useState, useEffect } from "react";

import Product_Header from './product_header';
import axios from "axios";
import Cart from "./cart";


function Product() {
  const [ans, setAns] = useState([]);
  const [cart, setCart] = useState([]);
  const [oncart, setOnCart] = useState(false);
  const [ans1, setAns1] = useState('');



  function getProduct() {
    axios.get("http://localhost:9000/getproduct").then((res) => {
      console.log(res.data);
      const ans = res.data;
      const ans1 = res.data;
      setAns(ans);
      setAns(ans1);
    })
  }

  const searchData = async (e) => {
    const key = e.target.value;
    console.log(key);
    if (key != "") {
      const result = await ans.filter((val) => {
        return Object.values(val).join("").toLowerCase().includes(key);
      });
      console.log(result);
      setAns(result);
    } else {
      setAns(ans1);
    }
  };

  function Display({ item, addProduct, removeProduct }) {
    const [product, setProduct] = useState(false);
    const addcart = () => {
      addProduct(item);
      setProduct(true);
    }

    const removeCart = () => {
      removeProduct(item.id);
      setProduct(false);
    }
    return (

      <tr >
        <td>{item.product_code}</td>
        <td>{item.name}</td>
        <td>{item.brand}</td>
        <td>{item.price}</td>
        <td>{item.product_status}</td>
        <td>{product ? <button onClick={removeCart}>Rmove</button> : <button onClick={addcart}>Add</button>}</td>
      </tr>
    )
  }
  function addProduct(data) {
    cart.push(data);
    console.log(cart);
  }

  function removeProduct(id) {
    cart.splice(cart.findIndex((e) => e.id == id), 1);
    console.log(cart);
  }


  useEffect(() => {
    getProduct()
  }, []);

  return (
    <div>
      <Product_Header />
      {!oncart ?
        <div>
          <h1>Product Home</h1>
          <button onClick={() => {
            setOnCart(!oncart)
            setCart(cart)
          }}> Cart</button>
          <br></br>
          <br></br>
          <div style={{ marginLeft: '23%' }} className="col-xm-10 col-sm-8 col-md-6 col-lg-4 d-flex">
            <input className="form-control mr-sm-2 me-3" type="search" placeholder="Search" aria-label="Search"  onChange={searchData} />
           
          </div>
          <br></br>
          <center>
            <table border={{}}>
              <thead>
                <tr>
                  <th>Product Code</th>
                  <th> Name</th>
                  <th>Company</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  ans.length > 0 ? (
                    ans.map((item) => (
                      <Display
                        item={item}
                        key={item.id}
                        addProduct={addProduct}
                        removeProduct={removeProduct}
                      />
                    ))
                  ) : <></>
                }
              </tbody>
            </table>
          </center>
        </div>
        :
        <Cart
          cart={cart}
        />}

    </div>
  )
}

export default Product;