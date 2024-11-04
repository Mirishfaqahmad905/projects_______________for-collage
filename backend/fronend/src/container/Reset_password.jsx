import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../container/css/Reset_password.css';
import { useDispatch } from 'react-redux';
import { setAdmin } from './reduxToolKit/userSlice';

const Reset_password = () => {
  const [response, setResponse] = useState('');
  const [token, setToken] = useState('');
   const disptach=useDispatch();
  const [data, setData] = useState({
    user_id: '',
    password: '',
    repassword: '',
  });
  // Extract token from URL when component mounts
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = queryParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl); // Save the token for later use
    }
  }, []);

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();

    // Simple validation to check if passwords match
    if (data.password !== data.repassword) {
      alert('Passwords do not match!');
      return;
    }

    // Make sure the token is available before making the request
    if (!token) {
      alert('Token is missing!');
      return;
    }

    axios
      .post('http://localhost:3000/reset_password', { ...data, token })
      .then((res) => {
        setResponse(res.data.message);
         if(res.status==200){
          window.alert('successfully updated the password');
           disptach(setAdmin(data));
           window.location.href='/admin';
         }
         
      })
      .catch((error) => {
        console.log('An error occurred:', error);
      });
       
  };

  // Handle input change
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container_admin_signup">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="user_id"
          placeholder="Enter Your ID"
          value={data.user_id}
          onChange={changeHandler}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          value={data.password}
          onChange={changeHandler}
          required
        />
        <input
          type="password"
          name="repassword"
          placeholder="Re-enter Your Password"
          value={data.repassword}
          onChange={changeHandler}
          required
        />
        <input type="submit" value="Reset Password" />
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default Reset_password;
