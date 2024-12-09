// import { faStackOverflow } from '@fortawesome/free-brands-svg-icons/faStackOverflow'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import React from 'react'
// import {Link} from 'react-router-dom'
// import Navbar from 'react-bootstrap/Navbar';

// function Header() {
//   return (
//     <div>
//       <Navbar  className='bg-success D-flex align-items-center'>
        
//             <Link to={'/'} style={{textDecoration:'none'}}>
//               <NavBar.Brand className='text-light'>
//                 <span className='fs-3 ms-5'><FontAwesomeIcon icon ={faStackOverflow}/>Project Fair</span>

//               </NavBar.Brand>
//             </Link>
     

//       </Navbar>
//     </div>
//   )
// }

// export default Header
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons/faPowerOff';
import { loginResponseContext } from '../context/Contextshare';

function Header() {
const [ token , setToken] = useState("")
const navigate = useNavigate()
const {setLoginResponse} = useContext(loginResponseContext)
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
           setToken(sessionStorage.getItem("token"))
    }
  },[])

  const handelLogout = ()=>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setLoginResponse(false)
    navigate('/')
  }

  return (
    <>
    <Navbar className='bg-success d-flex align-items-center'>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <Navbar.Brand className='text-light'>
          <span className='fs-3 ms-5'>
            <FontAwesomeIcon icon={faStackOverflow} /> Project Fair
          </span>
        </Navbar.Brand>
      </Link>
      {token && <button onClick={handelLogout}  className='btn btn-warning ms-auto rounded-0'>
        <FontAwesomeIcon icon={faPowerOff} className='me-2'/>
        Logout</button>}
    </Navbar>
    </>
  );
}

export default Header;
