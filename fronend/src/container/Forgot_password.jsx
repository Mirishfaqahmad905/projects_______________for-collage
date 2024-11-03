import React, { useState } from 'react';
import axios from 'axios';
import '../admin/admincss/adminlogin.css';

const AdminLogin = () => {
  // Initializing the state for form data with empty fields
  const [data, setData] = useState({
    email: '', // Field name must match the backend schema
  });

  // Handler for form submission
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/forgotpassword', data)
      .then((response) => {
        if (response.status === 200) {
          window.alert('check you gmail ');
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
        <h4>Forgot password</h4>
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
        
          <input type="submit" value="send Email" onClick={''} />
        
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
