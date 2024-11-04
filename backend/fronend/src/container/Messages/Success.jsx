import React from 'react'
import '../css/successMessage.css';
const Success = () => {
  return (
    <div>
         <div className="container_success_messsage">
             <div className="banner_success_message">
                 <span>Your Form are successfully submite please move back to home page </span>
             </div>
          <button className='btn_back_success' onClick={()=>location.href='/'}>Back</button>
         </div>
    </div>
  )
}

export default Success