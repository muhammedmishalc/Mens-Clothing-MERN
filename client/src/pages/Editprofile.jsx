import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Editprofile() {
  
    const navigate = useNavigate()
    const [input,setInput]= useState({})
    console.log(input);
    const inputchange= (event)=>{
        const{name,value}=event.target
        setInput({...input,[name]:value})
    }
    const {id} =useParams()
    useEffect(()=>{
        const data1 = localStorage.getItem('token')
        console.log(data1);
        axios.get(`http://localhost:2500/reg/viewoneprofile`,{ headers: { Authorization: `Bearer ${data1}` } }).then((data)=>{
            console.log(data);
            setInput(data.data.details)
          })
    },[])
    
    const submit = (event)=>{
      event.preventDefault()
      axios.post(`http://localhost:2500/reg/editprofile/${id}`, input).then((data)=>{
        console.log(data);
        setInput(data.data.details)
        navigate('/')
      })
    }

  return (
    <React.Fragment>
        <Navbar/>
 {/* <!-- heading --> */}
 <div class="container-fluid text-center"><br/>
        <div class="row"><div class="col"><h1 class="display-4">Edit Profile</h1></div></div>
      </div>

      {/* <!-- register --> */}
      <section className='vh-100'>
        <div class="container py-5 h-100">
          <div class="row d-flex align-items-center justify-content-center h-100">
            <div class="col-md-8 col-lg-7 col-xl-6">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                class="img-fluid" alt="Phone image"/>
            </div>
            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <form>
            <div class="form-outline mb-4">
              <label class="form-label" for="form1Example13">User Name :</label>
              <input type="text" id="form1Example1" class="form-control form-control-lg" name="username" onChange={inputchange} value={input?.username}/>              
            </div>

            <div class="form-outline mb-4">
              <label class="form-label" for="form1Example13">Email Id :</label>
              <input type="email" id="form1Example2" class="form-control form-control-lg" name="emailid" onChange={inputchange} value={input?.emailid}/>              
            </div>

            <div class="form-outline mb-4">
              <label class="form-label" for="form1Example13">Phone number :</label>
              <input type="text" id="form1Example3" class="form-control form-control-lg" name="phone" onChange={inputchange} value={input?.phone}/>              
            </div>

            <div class="form-outline mb-4">
              <label class="form-label" for="form1Example13">Address :</label>
              <input type="text" id="form1Example4" class="form-control form-control-lg" name="address" onChange={inputchange} value={input?.address}/>              
            </div>


            
            
          
  
           
            
        
  
            {/* <!-- Submit button --> */}
            <button type="submit" class="btn btn-secondary btn-lg btn-block col-12" onClick={submit} >Update Profile</button>
  
          </form>
        </div>
      </div>
    </div>
  </section>

    </React.Fragment>
  )
}
