import Joi from 'joi'
import { useState } from 'react';
import  Axios  from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register(){
    let [loading ,setLoading] = useState(false);
    let[error ,setError] = useState("");
    let[errorValidaion ,seterrorValidaion] = useState([]);
    let navigate = useNavigate();
    let[user,setUser]=useState({
        first_name:'' ,
        last_name:'' ,
        age:0 ,
        email:'' ,
        password:'' 
    })
   function getData(e){
    let newUser ={...user}
    newUser[e.target.name] =e.target.value
    setUser(newUser)
    setError('')
    seterrorValidaion([])
   }
function validation(){
    const userSchema =Joi.object({
        first_name:Joi.string().alphanum().min(3).max(10).required(),
        last_name:Joi.string().alphanum().min(3).max(10).required(),
        age:Joi.number().min(10).max(80).required(),
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password:Joi.string().alphanum().min(3).max(10).required(),
    })
    return userSchema.validate(user,{abortEarly:false})
}

  async function register(e){
    e.preventDefault()
    setLoading(true)
   let validationData= validation()
   if(validationData.error){
  
    seterrorValidaion(validationData.error.details)
    setLoading(false)
   
   }else{
    let {data} =await Axios.post('https://auths41-mohamed-ahmeds-projects-c9a29bb9.vercel.app/user/signUp',user)
  
    
    if(data.message==='Success'){
        setLoading(false)
   
        navigate('/login')
    }else{
        setError(data.message)
        setLoading(false)
    }
    
   }
   
  
   }

    return(
        <>
            <div className="w-75 m-auto py-4">
                <h1 className="text-center">Register</h1> 
                {error.length >0 ?<div className='alert alert-danger'>{error}</div>:''}
                {errorValidaion.map((datail,i)=><div key={i} className='alert alert-danger'>{datail.message}</div>)}
                <form onSubmit={register}>
                    <label className="mb-2" htmlFor="first_name">First Name</label>
                    <input onChange={getData} type="text" id="first_name" name="first_name"  className="form-control mb-2 bg-transparent text-white"/>

                    <label className="mb-2" htmlFor="last_name">Last Name</label>
                    <input onChange={getData} type="text" id="last_name" name="last_name"  className="form-control mb-2 bg-transparent text-white"/>

                    <label className="mb-2" htmlFor="age">Age</label>
                    <input onChange={getData} type="number" id="age" name="age"  className="form-control mb-2 bg-transparent text-white"/>

                    <label className="mb-2" htmlFor="email">Email :</label>
                    <input onChange={getData} type="email" id="email" name="email"  className="form-control mb-2 bg-transparent text-white"/>

                    <label className="mb-2" htmlFor="password">Password</label>
                    <input onChange={getData} type="password" id="password" name="password"  className="form-control mb-2 bg-transparent text-white"/>
                    <button type="submit" className="btn btn-outline-info my-2">{loading ===true?<i className='fas fa-spinner fa-spin'></i>:'Register'}</button>

                </form>
            </div>
        </>
    )
}