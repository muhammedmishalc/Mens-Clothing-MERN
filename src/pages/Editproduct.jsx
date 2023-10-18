import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function Editproduct() {
  const navigate = useNavigate()
  const [input, setInput] = useState({})
  const inputChange = (event) => {
    const { name, value } = event.target
    setInput({ ...input, [name]: value })
  }
  const { id } = useParams()
  // console.log(id);
  useEffect(() => {
    axios.get(`http://localhost:2500/main/viewoneproduct/${id}`).then((data) => {
      console.log(data);
      setInput(data.data.details)
    })
  }, [])
  const submit = (event) => {
    event.preventDefault()
    axios.post(`http://localhost:2500/main/editproduct/${id}`, input).then((data) => {
      console.log(data);
      setInput(data.data.details)
      navigate('/')
    })
  }


  return (
    <div>
      <Navbar />
      <div class="container-fluid text-center"><br />
        <div class="row"><div class="col"><h1 class="display-4">Edit Product</h1></div></div>
      </div>
      {/* <!-- add book --> */}
      <section class="vh-100">
        <div class="container py-5 h-100">
          <div class="row d-flex align-items-center justify-content-center h-100">

            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form>

                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example13">Product Name :</label>
                  <input type="text" id="form1Example13" class="form-control form-control-lg" name="productname" onChange={inputChange} value={input?.productname} />

                </div>


                {/* <!--Image--> */}
                <div>
                  <div class="mb-4 d-flex justify-content-center">
                    <img src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
                      alt="example placeholder" style={{ width: '200px' }} />
                  </div>
                  <div class="d-flex justify-content-center">
                    <div class="btn btn-secondary btn-rounded">
                      <label class="form-label text-white m-1" for="customFile1">Edit image</label>
                      <input type="file" class="form-control d-none" id="customFile1" />
                    </div>
                  </div>
                </div><br />


                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example13">Category :</label>
                  <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name="category" onChange={inputChange}>
                    <option selected value=''>Select category</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Pants">Pants</option>
                    <option value="T-shirt">T-shirt</option>
                    <option value="Shorts">Shorts</option>
                  </select>
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example13">Price :</label>
                  <input type="text" id="form1Example13" class="form-control form-control-lg" name="price" onChange={inputChange} value={input?.price} />

                </div>

                
                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example13">Quantity available :</label>
                  <input type="text" id="form1Example13" class="form-control form-control-lg" name="quantityavailable" onChange={inputChange} value={input?.quantityavailable} />

                </div>

                {/* <!-- Submit button --> */}
                <button type="submit" class="btn btn-secondary btn-lg btn-block col-12" onClick={submit}>Edit Product</button>

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
