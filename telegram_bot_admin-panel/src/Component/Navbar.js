import React from 'react'
import logo from '../asset/healthtrip.jpg'

import {useNavigate,Link } from "react-router-dom";


function Navbar() {
    const navigate=useNavigate()
   const token=localStorage.getItem('token')
  return (
    <nav>
        <Link to='/'> <img src={logo}  alt='logo'/></Link>
            <div className='left'>
            
                    {
                    token?
                    <>
                    <button className='button-5' onClick={()=>{
                        navigate('/admin')
                    }}
                    >Admin</button>
                    
                    <button className='button-5' onClick={()=>{
                        localStorage.removeItem('token')
                        navigate('/login')
                    
                    }}>Logout</button>
                    </>
                    :
                    <>
                   
                    <button className='button-5' onClick={()=>{
                        navigate('/login')
                    }} 
                    >Login</button>
                    </>
                    }
                    
                    
                    
              
              
             
            </div>
    </nav>
  )
}

export default Navbar  