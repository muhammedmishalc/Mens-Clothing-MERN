import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Payment from './Payment'
import Swal from 'sweetalert2'

export default function Cart() {
  const [cart, setCart] = useState([])
  const [totalprice,setTotalprice] = useState(0)
  const [change,setchange] = useState(true)
  console.log(cart)
const navigate= useNavigate()
  useEffect(() => {
    const data1 = localStorage.getItem('token')
    console.log(data1);
    axios.get('http://localhost:2500/cart/viewcartitems', { headers: { Authorization: `Bearer ${data1}` } }).then((data) => {
      console.log(data);
      setCart(data.data.details)
      setTotalprice(data.data.totalamount)      
    })
  }, [change])

  const deletefromcart = (id) => {
    console.log(id);
    const data1 = localStorage.getItem('token')
    console.log(data1);
    axios.get(`http://localhost:2500/cart/deletefromcart/${id}`, { headers: { Authorization: `Bearer ${data1}` } }).then((response) => {
      console.log(response);      
     const final_data= cart.filter((items)=>{
        return items._id != id
      })
      setCart(final_data)
      setchange(!change)      
    }).catch((error) => {
      console.log(error);
    })
  }

  const addquantity = (dd) => {
    console.log(dd);
    axios.get(`http://localhost:2500/cart/addquantity/${dd}`).then((data) => {
      console.log(data);
      setchange(!change)
    }).catch((error) => {
      console.log(error);
    })
  }
  const deletequantity = (dd) => {
    console.log(dd);
    axios.get(`http://localhost:2500/cart/deletequantity/${dd}`).then((data) => {
      console.log(data);
      setchange(!change)
      
    }).catch((error)=>{
      console.log(error);
      Swal.fire(error.response.data.message)
    })
  }
  const submit = (totalprice)=>{
navigate(`/paymentpage/${totalprice}`)
  }
  return (
    <React.Fragment>
      <Navbar />
      <section class="h-100 h-custom" style={{ backgroundColor: "lightgrey" }}>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12">
              <div class="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                <div class="card-body p-0">
                  <div class="row g-0">
                    <div class="col-lg-8">
                      <div class="p-5">
                        <div class="d-flex justify-content-between align-items-center mb-5">
                          <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
                          <h6 class="mb-0 text-muted">{cart.length} items</h6>
                        </div>
                        <hr class="my-4" />

                        {cart[0] ?
                          cart.map((data, index) => (
                            <div class="row mb-4 d-flex justify-content-between align-items-center">
                              <div class="col-md-2 col-lg-2 col-xl-2">
                                <img
                                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
                                  class="img-fluid rounded-3" alt="Cotton T-shirt" />
                              </div>
                              <div class="col-md-3 col-lg-3 col-xl-3">
                                <h6 class="text-muted">{data.category}</h6>
                                <h6 class="text-black mb-0">{data.productname}</h6>
                                <h6 class="text-black mb-0">₹ {data.price}</h6>

                              </div>
                              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <button class="btn btn-link px-2">
                                  <i class="fas fa-minus" onClick={() => { deletequantity(data._id) }}></i>
                                </button>

                                {/* <input id="form1" min="0" name="quantity" value={data.quantity} type="number"
                                  class="form-control form-control-sm" readOnly/> */}
                                <p style={{marginTop:'14px'}}>{data.quantity}</p>


                                <button class="btn btn-link px-2">
                                  <i class="fas fa-plus" onClick={() => { addquantity(data._id) }}></i>
                                </button>
                              </div>
                              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h6 class="mb-0">₹ {data.price * data.quantity}</h6>
                              </div>
                              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                <a class="text-muted" ><i class="fas fa-times" onClick={() => { deletefromcart(data._id) }}></i></a>
                              </div>                              
                              <hr class="my-4" />
                            </div>
                          ))
                          :
                          console.log('error')
                        }

                        <div class="pt-5">
                          <h6 class="mb-0"><a href="/" class="text-body"><i
                            class="fas fa-long-arrow-alt-left me-2"></i>Back to shop</a></h6>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 bg-secondary">
                      <div class="p-5">
                        <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr class="my-4" />

                        <div class="d-flex justify-content-between mb-4">
                          <h5 class="text-uppercase">Items</h5>
                          <h5>{cart.length}</h5>
                        </div>

                        <hr class="my-4" />

                        <div class="d-flex justify-content-between mb-5">
                          <h5 class="text-uppercase">Total price</h5>
                          <h5>₹ {totalprice} </h5>
                        </div>

                        <button type="button" class="btn btn-dark btn-lg col-12"
                          data-mdb-ripple-color="dark" onClick={()=>{submit(totalprice)}}>Buy now</button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}
