import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Viewoneproduct from './Viewoneproduct';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchproducts } from '../redux/slice/productslice';

export default function Homepage() {
  const role = localStorage.getItem('role')
  const { products, loading } = useSelector(state => state.product)
  console.log(products);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [products, setProducts] = useState([])

  const [searcheditem, setSearcheditem] = useState([])
  console.log(searcheditem);
  console.log(products);
  useEffect(() => {

    dispatch(fetchproducts())

  }, [])

  const deleteproduct = (id) => {

    axios.get(`http://localhost:2500/main/deleteproduct/${id}`).then((response) => {
      console.log(response);
      window.location.reload()
    }).catch((error) => {
      console.log(error);
    })
  }
  const viewone = (id) => {
    navigate(`/viewone/${id}`)
  }
  const edit = (id) => {
    navigate(`/editproduct/${id}`)
  }
  const search = (searchresult) => {
    setSearcheditem(searchresult)
    console.log(searchresult);

  }
  return (
    <React.Fragment>
      <Navbar search={search} />
      {
        role == 'admin' ?
          <div>
            {/* admin part */}
            <div className='container-fluid'>
              <a class="btn btn-light btn-outline-dark" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" style={{ fontSize: '5vh' }}>
                Categories</a>
            </div>

            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
              <div class="offcanvas-header">
                <h6 class="offcanvas-title " id="offcanvasExampleLabel">Categories</h6>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <h3 href='#'>Shirts</h3>
                <hr className='divider' />
                <h3 href='#'>T-shirts</h3>
                <hr className='divider' />
                <h3 href='#'>Pants</h3>
                <hr className='divider' />
                <h3 href='#'>Shorts</h3>
                <hr className='divider' />
              </div>
            </div>
            {loading == true ?
              <Loader />
              : ""
            }
            {/* cards */}
            <section>
              <div class="text-center container py-5">
                <h4 class="mt-1 mb-5"><strong>Products</strong></h4>
                <div class="row">
                  {searcheditem[0] ?
                    searcheditem.map((data, index) => (
                      <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card" >
                          <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                            data-mdb-ripple-color="light">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp"
                              class="w-100" onClick={() => { viewone(data._id) }} />
                          </div>
                          <div class="card-body">
                            <a href="" class="text-reset">
                              <h5 class="card-title mb-3" onClick={() => { viewone(data._id) }}>{data.productname.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</h5>
                            </a>
                            <a href="" class="text-reset" >
                              <p onClick={() => { viewone(data._id) }}>{data.category}</p>
                            </a>
                            <h6 class="mb-3" onClick={() => { viewone(data._id) }}>₹{data.price}</h6>
                            <a className='btn btn-outline-secondary mx-1' onClick={() => { edit(data._id) }}>Edit</a>
                            <a className='btn btn-outline-secondary mx-1' onClick={() => { deleteproduct(data._id) }}>Delete</a>
                          </div>
                        </div>
                      </div>
                    ))
                    : products[0] ?
                      products.map((data, index) => (
                        <div class="col-lg-4 col-md-6 mb-4">
                          <div class="card" >
                            <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                              data-mdb-ripple-color="light">
                              <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp"
                                class="w-100" onClick={() => { viewone(data._id) }} />
                            </div>
                            <div class="card-body">
                              <a href="" class="text-reset">
                                <h5 class="card-title mb-3" onClick={() => { viewone(data._id) }}>{data.productname.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</h5>
                              </a>
                              <a href="" class="text-reset" >
                                <p onClick={() => { viewone(data._id) }}>{data.category}</p>
                              </a>
                              <h6 class="mb-3" onClick={() => { viewone(data._id) }}>₹{data.price}</h6>
                              <a className='btn btn-danger mx-1' onClick={() => { edit(data._id) }}>Edit</a>
                              <a className='btn btn-danger mx-1' onClick={() => { deleteproduct(data._id) }}>Delete</a>
                            </div>
                          </div>
                        </div>
                      ))
                      :
                      <div></div>
                  }
                </div>
              </div>
            </section>
          </div>
          :
          <div>
            {/* user part */}
            <div className='container-fluid'>
              <a class="btn btn-light btn-outline-dark" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" style={{ fontSize: '5vh' }}>
                Categories</a>
            </div>
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
              <div class="offcanvas-header">
                <h6 class="offcanvas-title " id="offcanvasExampleLabel">Categories</h6>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <h3 href='#'>Shirts</h3>
                <hr className='divider' />
                <h3 href='#'>T-shirts</h3>
                <hr className='divider' />
                <h3 href='#'>Pants</h3>
                <hr className='divider' />
                <h3 href='#'>Shorts</h3>
                <hr className='divider' />
              </div>
            </div>
            {loading == true ?
              <Loader />
              : ""
            }
            {/* cards */}
            <section>
              <div class="text-center container py-5">
                <h4 class="mt-1 mb-5"><strong>Products</strong></h4>
                <div class="row">
                  {searcheditem[0] ?
                    searcheditem.map((data, index) => (
                      <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card" >
                          <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                            data-mdb-ripple-color="light">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp"
                              class="w-100" onClick={() => { viewone(data._id) }} />
                          </div>
                          <div class="card-body">
                            <a href="" class="text-reset">
                              <h5 class="card-title mb-3" onClick={() => { viewone(data._id) }}>{data.productname.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</h5>
                            </a>
                            <a href="" class="text-reset" >
                              <p onClick={() => { viewone(data._id) }}>{data.category}</p>
                            </a>
                            <h6 class="mb-3" onClick={() => { viewone(data._id) }}>₹{data.price}</h6>
                          </div>
                        </div>
                      </div>
                    ))
                    : products[0] ?
                      products.map((data, index) => (
                        <div class="col-lg-4 col-md-6 mb-4">
                          <div class="card" >
                            <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                              data-mdb-ripple-color="light">
                              <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp"
                                class="w-100" onClick={() => { viewone(data._id) }} />
                            </div>
                            <div class="card-body">
                              <a href="" class="text-reset">
                                <h5 class="card-title mb-3" onClick={() => { viewone(data._id) }}>{data.productname.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</h5>
                              </a>
                              <a href="" class="text-reset" >
                                <p onClick={() => { viewone(data._id) }}>{data.category}</p>
                              </a>
                              <h6 class="mb-3" onClick={() => { viewone(data._id) }}>₹{data.price}</h6>
                            </div>
                          </div>
                        </div>
                      ))
                      :
                      <div></div>
                  }
                </div>
              </div>
            </section>
          </div>
      }






    </React.Fragment>
  )
}
