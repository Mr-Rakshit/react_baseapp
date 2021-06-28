import React from 'react'
import SigninA from './Signina'
import SigninP from './Signinp'
export default function Signin() {
    return (
        <div style={{  
            display: "grid",  
            gridTemplateColumns: "1fr 1fr"  
          }} >
          {/* <SigninA /> */}
          <SigninP />  
        </div>
    )
}
