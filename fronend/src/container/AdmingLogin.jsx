import React, { useState } from 'react';
import axios from 'axios';
import '../admin/admincss/adminlogin.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAdmin } from './reduxToolKit/userSlice';

const AdminLogin = () => {
   const disptach=useDispatch();

  // Initializing the state for form data with empty fields
  const [data, setData] = useState({
    email: '', // Field name must match the backend schema
    admin_pass: '' // Renaming this to match the backend 'admin_pass'
  });

  // Handler for form submission
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/admin', data)
      .then((response) => {
        if (response.status === 200) {
          window.alert('Successfully logged in');
           disptach(setAdmin(data.email ));
           window.location.href='/admindashboard';
        } else {
          window.alert('Failed to log in');
        }
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
    console.log(data); // Log the form data to verify it's working
  };

  // Handler for input changes
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
      <div className="container_admin_login" style={{ textAlign: 'center' }}>
       
      </div>
      <div className="admin_login_form">
        <form onSubmit={submitHandler}>
          <input
            type="email"
            name="email"
            placeholder="Enter admin email"
            value={data.email} // Correct value binding
            onChange={changeHandler}
            required
          />
          <input
            type="password"
            name="admin_pass" // This field name must match the backend schema (admin_pass)
            placeholder="Enter Admin Password"
            value={data.admin_pass} // Correct value binding
            onChange={changeHandler}
            required
          />
          <input type="submit" value="Login" />
          <li> <Link to={'/forgot_password'}>Reset Password</Link></li>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
