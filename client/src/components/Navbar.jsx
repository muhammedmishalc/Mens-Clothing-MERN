import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Navbar({ search }) {
  const role = localStorage.getItem('role')
 console.log(role);
  const [products, setProduct] = useState([])
  const [searchresult, setSearchresult] = useState({})
  console.log(searchresult);

  const handleChange = (e) => {

    const searchdata = products.filter((items) => {
      return items.productname.includes(e.target.value.toLowerCase())
    })

    search(searchdata)
    setSearchresult(searchdata)
  };
  useEffect(() => {

    axios.get('https://mensclothingserver.onrender.com/main/viewproducts').then((data) => {

      console.log(data);
      setProduct(data.data.details)
    }).catch((error)=>{
      console.log(error);
    })
  }, [])
  return (
    <React.Fragment>

      {
        role == 'admin' ?
          <nav class="navbar navbar-expand-lg static-top">
            <div class="container-fluid">
              <a class="navbar-brand" href="#"  ><h1 style={{ color: '#B68D40' }}><i><b>Men's Clothing</b></i></h1></a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link" href="/"><h5>HOME</h5></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/loginpage"><h5>LOGIN</h5></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#"><h5>CONTACT US</h5></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" style={{color:'red'}} href="/addproduct"><h5>ADD PRODUCT</h5></a>
                  </li>





                </ul>
                <form class="d-flex" role="search">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} />
                  <button class="btn btn-outline-dark" type="submit">Search</button>
                </form>
              </div>
              <a class="icon-link ps-3" href="/profile">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16" style={{ height: '40px', width: '40px', color: '#B68D40' }}>
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg></a>

              <a class="icon-link ps-3" href="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16" style={{ height: '40px', width: '40px', color: '#B68D40' }}>
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg></a>
            </div>
          </nav>

          :

          <nav class="navbar navbar-expand-lg static-top">
            <div class="container-fluid">
              <a class="navbar-brand" href="#"  ><h1 style={{ color: '#B68D40' }}><i><b>Men's Clothing</b></i></h1></a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link" href="/"><h5>HOME</h5></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/loginpage"><h5>LOGIN</h5></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#"><h5>CONTACT US</h5></a>
                  </li>





                </ul>
                <form class="d-flex" role="search">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} />
                  <button class="btn btn-outline-dark" type="submit">Search</button>
                </form>
              </div>
              <a class="icon-link ps-3" href="/profile">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16" style={{ height: '40px', width: '40px', color: '#B68D40' }}>
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg></a>

              <a class="icon-link ps-3" href="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16" style={{ height: '40px', width: '40px', color: '#B68D40' }}>
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg></a>
            </div>
          </nav>

      }




    </React.Fragment>
  )
}
