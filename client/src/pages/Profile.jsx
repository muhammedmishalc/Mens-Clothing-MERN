import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const [profile, setProfile] = useState({})
  console.log(profile);
  const navigate= useNavigate()
  useEffect(() => {
    const data = localStorage.getItem('token')
    console.log(data);
    axios.get(`http://localhost:2500/reg/viewoneprofile`,{
      headers:{
        Authorization:`Bearer ${data}`
      }
    }).then((response)=>{
      console.log(response);
      setProfile(response.data.details)
    })
  },[])
  
  const logout = ()=>{
    const log = localStorage.removeItem('token')
    const logg = localStorage.removeItem('role')
    navigate('/loginpage')
  }

  const edit = (id)=>{
navigate(`/editprofile/${id}`)
  }

  return (
    <div>
      <Navbar />
      <div className='container py-5'>
      <div class="row">
      <div class="col">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="image not found" style={{ height: '200px', width: '200px' }} />
        </div>
    </div>

       <div class="row">
        <div class="col-lg-8">
        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Full Name</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">: {profile.username}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">: {profile.emailid}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Phone</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">: {profile.phone}</p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Address</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">: {profile.address}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        <a className='btn btn-secondary' onClick={()=>{edit(profile._id)}}>Edit Profile</a><br /><br />
        <a className='btn btn-secondary' onClick={logout}>Logout</a>
        


        {/* <div class="row">
      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body text-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
              class="rounded-circle img-fluid" style={{width: '150px'}}/>
            <h5 class="my-3">John Smith</h5>
            <p class="text-muted mb-1">Full Stack Developer</p>
            <p class="text-muted mb-4">Bay Area, San Francisco, CA</p>
            <div class="d-flex justify-content-center mb-2">
              <button type="button" class="btn btn-primary">Follow</button>
              <button type="button" class="btn btn-outline-primary ms-1">Message</button>
            </div>
          </div>
        </div>
        </div>
        </div>
 */}

      </div>
             
    </div>
  )
}
