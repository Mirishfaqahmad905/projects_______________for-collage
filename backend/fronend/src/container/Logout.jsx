import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './reduxToolKit/userSlice';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Logout = () => {
 const dispatch=useDispatch();

    const HandleLogout=()=>{
        dispatch(logout());
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          })

    }
  return (
    <div>
         
         <Button onClick={HandleLogout}>LogOut</Button>
    </div>
  )
}

export default Logout