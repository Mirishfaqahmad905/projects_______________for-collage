import React, { useState } from 'react'

const AdminSignup = () => {
  const [data,setData]=useState();

    const submitHandler=(e)=>{
        e.preventDefault();   
      }
    const changeHandler=(e)=>{
    setData(...data,[e.target.vale]:e.target.name);
     }

  return (
    <div>
        <div className="cotainer_admin_signup">
             <form action="" onSubmit={submitHandler}>
                 <input type="text" name="user_id" id="" placeholder='Enter Your id' onChange={changeHandler} />
                 <input type="password" name="passsoword" id="" placeholder='Enter Your password' onChange={changeHandler} />
                 <input type="password" name="repassword" id="" placeholder='enter repassword' onChange={changeHandler} />
                 <input type="submit" name="" id="" />
             </form>
        </div>
    </div>
  )
}

export default AdminSignup