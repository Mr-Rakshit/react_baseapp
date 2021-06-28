import React from 'react'
import SignupA from './Signupa'
import SignupP from './Signupp'
export default function SignUp() {
    return (
        <div style={{  
            display: "grid",  
            gridTemplateColumns: "1fr 1fr"  
          }} >
          {/* <SignupA /> */}
          <SignupP />  
        </div>
    )
}
