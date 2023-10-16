import './App.css';
import React, { useEffect, useState } from 'react'
import Admin from './Component/Admin';


import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';



function App() {
  
  return(
    <>
    
    
      <GoogleOAuthProvider clientId="184576957181-ed2jfd9r809qd3dmij07gptakchod0uc.apps.googleusercontent.com">
  
      <GoogleLogin
          onSuccess={credentialResponse => {
          
          }}
          onError={() => {
            console.log('Login Failed')
          }}
      />
   <Admin/>
       </GoogleOAuthProvider>
    
    </>
  )
  
    
  
}

export default App;
