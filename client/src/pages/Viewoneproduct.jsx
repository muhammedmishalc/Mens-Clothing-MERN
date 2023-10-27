import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { fetchoneproduct } from '../redux/slice/productslice'
export default function Viewoneproduct() {
    const { oneproduct, loading } = useSelector(state => state.product)
    console.log(oneproduct);
    const dispatch = useDispatch()
    const { id } = useParams()
    // console.log(id);
    useEffect(() => {
        dispatch(fetchoneproduct(id))
    }, [])

    const addtocart = (id) => {

        const data1 = localStorage.getItem('token')
        console.log(data1);
        const data = {
            productid: id
        }
        axios.post('http://localhost:2500/cart/addtocart', data, { headers: { Authorization: `Bearer ${data1}` } }).then((response) => {
            console.log(response);

            Swal.fire(response.data.message)
        }).catch((error) => {
            console.log(error);
            Swal.fire(error.response.data.message)
        })
    }
    return (
        <div>
            <Navbar />
            {loading == true ?
                <Loader />
                : ""
            }
            <div class="container-fluid">
                <section>
                    <div class="container py-5 h-100">
                        <div class="row">
                            <div class="col-md-8 col-lg-7 col-xl-6">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
                                    class="img-fluid" alt="Phone image" />
                            </div>
                            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                                <div class="" style={{ fontFamily: 'serif' }}>
                                    <h2>{oneproduct?.productname?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</h2>
                                    <hr className='divider' />
                                    <p>Category : {oneproduct.category}</p>
                                    <h4>Price : ₹{oneproduct.price}</h4>
                                    <p>Inclusive of all taxes</p>
                                    <button onClick={() => { addtocart(oneproduct._id) }}>Add to cart</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div class="pt-5">
                    <h6 class="mb-0"><a href="/" class="text-body"><i
                        class="fas fa-long-arrow-alt-left me-2"></i>Back to home</a></h6>
                </div>
            </div>


        </div>
    )
}
