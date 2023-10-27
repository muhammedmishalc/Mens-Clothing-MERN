import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { object } from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { fetchaddproduct } from '../redux/slice/productslice'

export default function Addproduct() {
  const {addproduct}= useSelector(state=>state.product)
  console.log(addproduct);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [input, setInput] = useState({
    productname: '',
    // image:'',
    category: '',
    price: '',
    quantityavailable: '',
    description: '',
  })

  const [formError, setFormError] = useState({})

  const inputChange = (event) => {
    const { name, value } = event.target
    setInput({ ...input, [name]: value })
  }
  console.log(input);

  const validate = (value) => {
    var error = {}
    if (!value.productname) {
      error.productname = 'Enter productname'
    }
    // if (!value.image) {
    //   error.image = 'Enter image'
    // }
    if (!value.category) {
      error.category = 'Select category'
    }
    if (!value.price) {
      error.price = 'Enter price'
    }
    if (!value.quantityavailable) {
      error.quantityavailable = 'Enter quantity available'
    }
    if (!value.description) {
      error.description = 'Enter description'
    }
    return error
  }

  const submit = (event) => {
    event.preventDefault()
    setFormError(validate(input))
    const formsData = new FormData()
    const name = input.file.name
    console.log(name);
    formsData.append('file', input.file)
    formsData.append('filename', input.file.name)
    formsData.append('productname', input.productname)
    formsData.append('category', input.category)
    formsData.append('price', input.price)
    formsData.append('quantityavailable', input.quantityavailable)
    formsData.append('description', input.description)
    if (Object.keys(formError).length == 0) {
      axios.post('http://localhost:2500/main/addproduct',formsData).then((res)=>{
        console.log(res);
      })
      // dispatch(fetchaddproduct(formsData))
    }
  }
  return (
    <div>
      <Navbar />
      <div class="container-fluid text-center"><br />
        <div class="row"><div class="col"><h1 class="display-4">Add Product</h1></div></div>
      </div>
      {/* <!-- add book --> */}
      <section class="vh-100">
        <div class="container py-5 h-100">
          <div class="row d-flex align-items-center justify-content-center h-100">

            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form>

                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example13">Product Name :</label><span style={{ color: 'red' }}> {formError.productname}</span>
                  <input type="text" id="form1Example1" class="form-control form-control-lg" name="productname" onChange={inputChange} onKeyDown={()=>{setFormError({...formError, 'productname':""})}}/>

                </div>


                {/* <!--Image--> */}
                <div>
                  <div class="mb-4 d-flex justify-content-center">
                    <img src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
                      alt="example placeholder" style={{ width: '200px' }} />
                  </div>
                  <div class="d-flex justify-content-center">
                    <div class="btn btn-secondary btn-rounded">
                      <label class="form-label text-white m-1" for="customFile1">+ Add image</label>
                      <input type="file" class="form-control d-none"  onChange={(e) => { setInput({ ...input, 'file': e.target.files[0] }) }} id="customFile1" />
                    </div>
                  </div>
                </div><br />


                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example13">Category :</label><span style={{ color: 'red' }}> {formError.category}</span>
                  <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name="category" onChange={inputChange} onSelect={()=>{setFormError({...formError, 'category':""})}}>
                    <option selected value=''>Select category</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Pants">Pants</option>
                    <option value="T-shirt">T-shirt</option>
                    <option value="Shorts">Shorts</option>
                  </select>
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example13">Price :</label><span style={{ color: 'red' }}> {formError.price}</span>
                  <input type="text" id="form1Example2" class="form-control form-control-lg" name="price" onChange={inputChange} onKeyDown={()=>{setFormError({...formError, 'price':""})}}/>

                </div>
                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example13">Quantity available :</label><span style={{ color: 'red' }}> {formError.quantityavailable}</span>
                  <input type="text" id="form1Example3" class="form-control form-control-lg" name="quantityavailable" onChange={inputChange} onKeyDown={()=>{setFormError({...formError, 'quantityavailable':""})}}/>

                </div>
                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example13">Product Description :</label><span style={{ color: 'red' }}> {formError.description}</span>
                  <input type="text" id="form1Example4" class="form-control form-control-lg" name="description" onChange={inputChange} onKeyDown={()=>{setFormError({...formError, 'description':""})}}/>

                </div>

                {/* <!-- Submit button --> */}
                <button type="submit" class="btn btn-secondary btn-lg btn-block col-12" onClick={submit}>+ Add Product</button>

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
