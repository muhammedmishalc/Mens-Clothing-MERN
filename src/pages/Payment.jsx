import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import axios from 'axios'

export default function Payment() {
  const { totalprice } = useParams()
  const [formError,setFormError] =useState({})
  const [isubmit,setIsubmit]=useState(false)
  const [input, setInput] = useState({
    cardnumber:'',
    expire:'',
    cvv:''
  })
  console.log(input);
  const inputChange = (event) => {
    const { name, value } = event.target
    setInput({ ...input, [name]: value })
  }

 
const validate = (value)=>{
  var error ={}
  if(!value.cardnumber){
    error.cardnumber='Enter card number'
  }
  if(!value.expire){
    error.expire='Enter expiry date'
  }
  if(!value.cvv){
    error.cvv='Enter cvv'
  }
  return error
}
  const submit= (event)=>{
    event.preventDefault()
    setFormError(validate(input))
    setIsubmit(true)
     
  }
   useEffect(() => {
    if(Object.keys(formError).length==0){
      axios.post('http://localhost:2500/pay/addcard', input).then((response) => {
        console.log(response);
      
        
      }).catch((error) => {
        console.log(error);
      })
    }   
      
  },[isubmit])
 
  return (
    <React.Fragment>

      <Navbar />
      <section style={{ backgroundColor: 'white' }}>
        <div class="container py-5">
          <div class="row d-flex justify-content-center">
            <div class="col-md-9 col-lg-7 col-xl-5">
              <div class="card">
                <img src="https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg?cs=srgb&dl=pexels-pixabay-50987.jpg&fm=jpg"
                  class="card-img-top" alt="Black Chair" />
                <div class="card-body">
                  <div class="card-title d-flex justify-content-between mb-0">
                    <p class="text-muted mb-0">Total Price</p>
                    <p class="mb-0">₹ {totalprice}</p>
                  </div>
                </div>
                <div class="rounded-bottom" style={{ backgroundColor: '#eee' }}>
                  <div class="card-body">
                    <p class="mb-4">Your payment details</p>

                    <div class="form-outline mb-3">
                      <input type="text" id="cardnumber" class="form-control"
                        placeholder="1234 5678 1234 5678"  name='cardnumber' onChange={inputChange} onKeyDown={()=>{setFormError({...formError, 'cardnumber':""})}}/>
                        <span id='span1'></span>
                      <label class="form-label" for="formControlLgXM8">Card Number</label><span style={{ color: 'red' }}> {formError.cardnumber}</span>
                    </div>

                    <div class="row mb-3">
                      <div class="col-6">
                        <div class="form-outline">
                          <input type="password" id="formControlLgExpk8" class="form-control"
                            placeholder="MM/YY" onChange={inputChange} name='expire' onKeyDown={()=>{setFormError({...formError, 'expire':""})}}/>
                          <label class="form-label" for="formControlLgExpk8">Expire</label><span style={{ color: 'red' }}> {formError.expire}</span>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="form-outline">
                          <input type="password" id="formControlLgcvv8" class="form-control" placeholder="cvv" onChange={inputChange} name='cvv' onKeyDown={()=>{setFormError({...formError, 'cvv':""})}}/>
                          <label class="form-label" for="formControlLgcvv8">Cvv</label><span style={{ color: 'red' }}> {formError.cvv}</span>
                        </div>
                      </div>
                    </div>

                    <button class="btn btn-info btn-block"  type="submit" onClick={submit}>Order now</button>
                    <div class="pt-5">
                      <h6 class="mb-0"><a href="/cart" class="text-body"><i
                        class="fas fa-long-arrow-alt-left me-2"></i>Back to cart</a></h6>
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
