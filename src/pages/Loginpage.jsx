import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchlogin } from '../redux/slice/loginslice';


export default function Loginpage() {
  const {loging}= useSelector(state=>state.user)
  console.log(loging);
  const dispatch=useDispatch()
  const navigate = useNavigate()
  const [input, setInput] = useState({
    username: '',
    password: ''
  })
  const [isubmit, setIsubmit] = useState(false)
  const [formError, setFormError] = useState({})
  console.log(formError);
  const inputchange = (event) => {
    const { name, value } = event.target
    setInput({ ...input, [name]: value })
  }

  const validate = (value) => {
    var error = {}
    if (!value.username) {
      error.username = 'Enter username'
    }
    if (!value.password) {
      error.password = 'Enter password'
    }
    return error
  }


  const login = (event) => {
    event.preventDefault()
    setFormError(validate(input))
    setIsubmit(true)
  }
  useEffect(() => {
    if (Object.keys(formError).length == 0) {
      dispatch(fetchlogin(input))       
    }
   
    
  }, [isubmit])
  useEffect(()=>{
    if(loging.message == 'Login successfull'){
      console.log(loging.message);
      navigate('/')
    }
  },[loging])
  return (
    <div>
      <Navbar />
      {/* <!-- heading --> */}
      <div class="container-fluid text-center"><br />
        <div class="row"><div class="col"><h1 class="display-3">Login</h1></div></div>
      </div>

      <section class="vh-100">
        <div class="container py-5 h-100">
          <div class="row d-flex align-items-center justify-content-center h-100">
            <div class="col-md-8 col-lg-7 col-xl-6">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                class="img-fluid" alt="Phone image" />
            </div>
            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form>
                {/* <!-- Email input --> */}
                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example13">User Name</label>  <span style={{ color: 'red' }}>{formError.username}</span>
                  <input type="text" id="form1Example1" class="form-control form-control-lg" name='username' onKeyDown={() => { setFormError({ ...formError, 'username': '' }) }} onChange={inputchange} />
                </div>

                {/* <!-- Password input --> */}
                <div class="form-outline mb-4">
                  <label class="form-label" for="form1Example23">Password</label>  <span style={{ color: 'red' }}>{formError.password}</span>
                  <input type="password" id="form1Example2" class="form-control form-control-lg" onKeyDown={() => { setFormError({ ...formError, 'password': '' }) }} name='password' onChange={inputchange} />

                </div>

                <div class="d-flex justify-content-around align-items-center mb-4">
                  {/* <!-- Checkbox --> */}
                  {/* <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                    <label class="form-check-label" for="form1Example3"> Remember me </label>
                  </div> */}
                  <a href="#">Forgot password?</a>
                  <a href="/registerpage">Not registered?</a>
                </div>

                {/* <!-- Submit button --> */}
                <button type="submit" class="btn btn-secondary btn-lg btn-block col-12" onClick={login}>Login</button>

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
