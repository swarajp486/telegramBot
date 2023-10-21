import React, { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import {useNavigate } from "react-router-dom";
function Login() {
    const navigate=useNavigate()
    const [ user, setUser ] = useState([]);
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse)
            
            localStorage.setItem("token", codeResponse.access_token);
            navigate('/admin')

        
        },
        onError: (error) => console.log('Login Failed:', error)
    });
  return (
    <div className='login'>

        <button className='button-5' onClick={() => login()}>Sign in with Google</button>
    </div>
  )
}

export default Login