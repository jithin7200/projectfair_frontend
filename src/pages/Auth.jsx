import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { loginApi, registerApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../context/Contextshare';

function Auth({register}) {

  const {setLoginResponse} = useContext(loginResponseContext)

  const navigate = useNavigate()

  const [userDetails ,setUserDetails]= useState({
    username:"",
    email:"",
    password:""
  })
 console.log(userDetails);

 const handleRegister =async()=>{
      const {username ,email, password } = userDetails
      if(!username || !email || !password)
      {
        toast.info("please fill the form completely")
       
      }
      else{
        const result = await registerApi({username,email,password})
        console.log(result);
        if (result.status==200) {
          toast.success('Registration successful')
          setUserDetails({
            username:"",
            email:"",
            password:""
          })
          navigate('/login')
        }
        else if (result.status==406) {
          toast.warning (result.response.data)
        }
        else{
          toast.error('something went worng')
        }
        
      }
 }
 
 const handleLogin =async()=>{
  const{email , password} = userDetails
  if (!email || !password) {
    
    toast.info('please fill the form completely')
  }
  else{
    const result =await loginApi({email ,password})
    console.log(result);
    if(result.status==200){
      toast.success('Login Successful')
      
      sessionStorage.setItem("existingUser",
       JSON.stringify( result.data.existingUser))
       sessionStorage.setItem("token",result.data.token)
      
      setUserDetails({
        username:"",
        email:"",
        password:""

      })
     setTimeout(()=>{
      navigate('/')
     },2000)
    }
else if (result.status==406)
{
toast.warning(result.response.data)
setUserDetails({
  username:"",
  email:"",
  password:""

})
}
else{
  toast.error('something went worng')
  setUserDetails({
    username:"",
    email:"",
    password:""

  })
   }

  }
 }

  return (
    <>
    <div className="container-fluid  p-5">
      <Link to={'/'}><p style={{color:'orange',textDecoration:'none'}}><FontAwesomeIcon icon={faArrowLeft}/> Back home</p></Link>
      <div className="row d-flex justify-content-center align-items-center column-flex bg-success">
        <div className="col-md-1"></div>
        
        <div className="col-md-5">
         
          <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="" className='w-50' />
        </div>
        <div className="col-md-5">
        <div className='align-items-center mb-5 text-light'>
          <span className='fs-3 ms-5 text-light'><h3><FontAwesomeIcon icon={faStackOverflow}/> Project Fair</h3></span>
         {!register ? <h4>Sign in to your account</h4>:
          <h4>Sign up to your account</h4>}
        </div>
        { register &&
        
          <input type="text" placeholder='username' className='form-control mt-3 rounded-0'value={userDetails.username}  onChange={(e)=>setUserDetails ({...userDetails,username:e.target.value})} />}
  
            <input type="text" placeholder='Email-id' className='form-control mt-3 rounded-0' value={userDetails.email}  onChange={(e)=>setUserDetails ({...userDetails,email:e.target.value})} />
            <input type="password" placeholder='Password' className='form-control mt-3 rounded-0'value={userDetails.password}  onChange={(e)=>setUserDetails ({...userDetails,password:e.target.value})} />
       
         { !register? <div>
            <button className='btn btn-warning mt-3 rounded-0 shadow' onClick={handleLogin}>Login</button>
            <h4 className= 'mt-4'>New User? click here to <Link to={'/register'}><span style={{color:'white'}}>Register</span></Link> </h4>
          </div>
          :
          <div>
            <button onClick={handleRegister} className='btn btn-warning mt-3 rounded-0 shadow'>Register</button>
            <h4 className= 'mt-4'>Alredy a user? click here to <Link to={'/login'}><span style={{color:'white'}}>Login</span></Link> </h4>
          </div>}
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>

    <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </>
  )
}

export default Auth

