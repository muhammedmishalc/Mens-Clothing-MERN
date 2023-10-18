import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Registerpage() {
  const navigate = useNavigate()
  const [isubmit,setIsubmit]= useState(false)
  const [input, setInput] = useState({
    username: "",
    emailid: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
    password: ""
  })
  const [formError, setFormError] = useState({})
  console.log(input);
  const inputchange = (event) => {
    const { name, value } = event.target
    setInput({ ...input, [name]: value })
  }
  const validate = (value) => {
    var emailRgex = /^([A-Za-z0-9\.-]+)@([A-Za-z0-9\-]+).([a-z]{2,3})([a-z]{2,3})?$/;
    var pincodeRgex=/^([0-9]{6})$/
    var phoneRgex=/^([0-9]{10})$/

    var error = {}
    if (!value.username) {
      error.username = 'Enter username'
    }
    if (!value.emailid) {
      error.emailid = 'Enter emailid'
    }
    else if (!emailRgex.test(value.emailid)) {
      error.emailid = 'Enter a valid emailid'
    }
    if (!value.phone) {
      error.phone = 'Enter phone'
    }
    else if (!phoneRgex.test(value.phone)) {
      error.phone = 'Enter a valid Mobile number'
    }
    if (!value.street) {
      error.street = 'Enter street'
    }
    if (!value.city) {
      error.city = 'Enter city'
    }
    if (!value.pincode) {
      error.pincode = 'Enter pincode'
    }
    else if (!pincodeRgex.test(value.pincode)) {
      error.phone = 'Enter a valid pincode'
    }
    if (!value.password) {
      error.password = 'Enter password'
    }
    return error
  }

  const submit = (event) => {
    event.preventDefault()
    // console.log(input);
    setFormError(validate(input))
    setIsubmit(true)
   
  }
  useEffect(()=>{
    if (Object.keys(formError).length==0) {
      axios.post('http://localhost:2500/reg/adduser', input).then((response) => {
        console.log(response);
        navigate('/loginpage')
      }).catch((error) => {
        console.log(error);
      })
    }
  },[isubmit])
  return (
    <div>
      <Navbar />
      {/* <!-- heading --> */}
      <div class="container-fluid text-center"><br />
        <div class="row"><div class="col"><h1 class="display-3">Registration</h1></div></div>
      </div>

      {/* <!-- register --> */}
      <section class="vh-100">
        <div class="container py-5 h-100">
          <div class="row d-flex align-items-center justify-content-center h-100">
            <div class="col-md-8 col-lg-7 col-xl-6">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                class="img-fluid" alt="Phone image" />
            </div>
            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form>
                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example13">User Name : </label><span style={{ color: 'red' }}> {formError.username}</span>
                  <input type="text" id="form1Example1" class="form-control form-control-lg" name="username" onKeyDown={()=>{setFormError({...formError, 'username':""})}} onChange={inputchange} />
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example13">Email Id :</label><span style={{ color: 'red' }}> {formError.emailid}</span>
                  <input type="email" id="form1Example2" class="form-control form-control-lg" name="emailid" onChange={inputchange} onKeyDown={()=>{setFormError({...formError, 'emailid':""})}}/>
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example13">Phone number :</label><span style={{ color: 'red' }}> {formError.phone}</span>
                  <input type="text" id="form1Example3" class="form-control form-control-lg" name="phone" onChange={inputchange} onKeyDown={()=>{setFormError({...formError, 'phone':""})}}/>
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example13">Street :</label><span style={{ color: 'red' }}> {formError.street}</span>
                  <input type="text" id="form1Example4" class="form-control form-control-lg" name="street" onChange={inputchange} onKeyDown={()=>{setFormError({...formError, 'street':""})}}/>
                </div>
                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example13">City :</label><span style={{ color: 'red' }}> {formError.city}</span>
                  <input type="text" id="form1Example5" class="form-control form-control-lg" name="city" onChange={inputchange} onKeyDown={()=>{setFormError({...formError, 'city':""})}}/>
                </div>
                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example13">Pincode :</label><span style={{ color: 'red' }}> {formError.pincode}</span>
                  <input type="text" id="form1Example6" class="form-control form-control-lg" name="pincode" onChange={inputchange} onKeyDown={()=>{setFormError({...formError, 'pincode':""})}}/>
                </div>






                {/* <!-- Password input --> */}
                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example23">Create Password :</label><span style={{ color: 'red' }}> {formError.password}</span>
                  <input type="password" id="form1Example7" class="form-control form-control-lg" name="password" onChange={inputchange} onKeyDown={()=>{setFormError({...formError, 'password':""})}}/>

                </div>

                <div class="form-check d-flex justify-content-center mb-5">
                  <input class="form-check-input me-2" type="checkbox" value="" id="form2Example8" />
                  <label class="form-check-label" for="form2Example3">
                    I agree all statements in <a href="#!">Privacy Policy</a>
                  </label>
                </div>



                {/* <!-- Submit button --> */}
                <button type="submit" class="btn btn-secondary btn-lg btn-block col-12" onClick={submit}>Register</button><br /><br />

              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
