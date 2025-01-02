import  Axios  from 'axios'
import Joi from 'joi'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Login(props) {
  let navigate=useNavigate()

  let [validateError,setvalidateError]=useState([])
  let [loading,setLoading]=useState(false)
  let [error ,setError] = useState('')
  let [user ,setUser]=useState({
    email:'',
    password:''
  })

function getData(e){
  let newUser={...user}
  newUser[e.target.name]=e.target.value
  setUser(newUser)
  setError('')
  setvalidateError([])
}

function validation(){
  const userSchema=Joi.object({
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().required()
  })
  return userSchema.validate(user,{abortEarly:false})
}

async function submitForm(e){
  e.preventDefault()
  setLoading(true)

  let validationData =validation()
  if(validationData.error){
    setvalidateError(validationData.error.details)
    setLoading(false)
  }else{
    const {data} =await Axios.post('https://auths41-mohamed-ahmeds-projects-c9a29bb9.vercel.app/user/signIn',user)
    
    if(data.message === 'success'){
      setLoading(false)
      localStorage.setItem('encodedToken',data.token)
      props.Data()
      navigate('/home')
    }else{
    
      setError(data.message)
      setLoading(false)
    }
  }
  
 
}
  return (
    <>
      <div className="w-75 m-auto py-4 ">
          <h1 className="text-center">Login</h1>
          {error.length>0?<div className='alert alert-danger'>{error}</div>:''}
          {validateError.map((datail,i)=><div key={i} className='alert alert-danger'>{datail.message}</div>)}
        <form onSubmit={submitForm}>
          <label className="mb-2" htmlFor="email">Email :</label>
          <input onChange={getData} type="email" id="email" name="email" className="form-control mb-2 bg-transparent text-white" />

          <label className="mb-2" htmlFor="password">Password</label>
          <input onChange={getData} type="password" id="password" name="password" className="form-control mb-2 bg-transparent text-white" />
          <button type="submit" className="btn btn-outline-info my-2">{loading===true?<i className='fas fa-spinner fa-spin'></i>:'Login'}</button>
          <p className='text-center'>If you don't have account <Link className='custom-link' to="/register">Register</Link></p>
        </form>
      </div>
    </>
  )
}
