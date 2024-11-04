import React, { useState } from 'react';
import './css/Signup.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reduxToolKit/userSlice'; // Import the setUser action
import Swal from 'sweetalert2';

const Signup = () => {
  const dispatch = useDispatch(); // Initialize the dispatch function
  const IsLoggedIn=useSelector((state)=>state.user.IsLoggedIn);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: ''
  });
  const [serverResponse, setServerResponse] = useState('');
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation checks
    if (!data.name || !data.email || !data.password || !data.rePassword) {
      return window.alert('Please fill in all fields');
    }

    // Name must be longer than 5 characters and should not contain digits
    const nameRegex = /^[A-Za-z\s]+$/;  // Only letters and spaces are allowed
    if (!nameRegex.test(data.name) || data.name.trim().length <= 5) {
      return window.alert('Name should only contain letters and spaces, and must be greater than 5 characters');
    }
    // Password length check (greater than 8 characters)
    if (data.password.length < 8) { // Changed from 4 to 8
      return window.alert('Password must be at least 8 characters long');
    }

    // Password match check
    if (data.password !== data.rePassword) {
      return window.alert('Passwords do not match');
    }
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        name: data.name,
        email: data.email,
        password: data.password,
        rePassword: data.rePassword
      });

      setServerResponse(response.data.message);

      if (response.status === 200) {
        // Dispatch the user data to Redux store on successful signup
        // dispatch(setUser({ name: data.email.split('@')[0], email: data.email })); 
        Swal.fire('successfully Created account');
        window.location.href='/login'
      
      } else {
        window.alert('Failed to create account');
      }
    } catch (error) {
      console.error("Error occurred during signup:", error);
      window.alert('An error occurred while creating the account');
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div>
      <div className="signup_head_">
        <div className="signup_left_side">
          <h4>Left side of signup page</h4>
          <img 
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?t=st=1728921089~exp=1728924689~hmac=268d8d1f0b02acad783074ca012c1fdec456d86d83f89af5c7984d81063560de&w=740" 
            alt="Signup Illustration" 
          />
        </div>

        <div className="right_side_signup">
          <h3>Right side of signup</h3>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name" 
              value={data.name}
              onChange={handleChange} 
              placeholder="Enter Your Name Here" 
            />
            <input 
              type="email" 
              name="email" 
              value={data.email}
              onChange={handleChange} 
              placeholder="Enter Your Email Here" 
            />
            <input 
              type="password" 
              name="password" 
              value={data.password}
              onChange={handleChange} 
              placeholder="Enter Your Password" 
            />
            <input 
              type="password" 
              name="rePassword" 
              value={data.rePassword}
              onChange={handleChange} 
              placeholder="ReType Your Password" 
            />
            <button className="Create_account_button" type="submit">
              Create Your Account
            </button>
            {/* <button className="Login_with_google_button" type="button">
              Login With Google
            </button> */}
            <Link to={'/login'}>Already Have Account</Link>
          </form>
          <p>{serverResponse}</p> {/* Display server response message */}
        </div>
      </div>
    </div>
  );
};
// my google auth2.0 api key AIzaSyBByTnP2hgBmMpnQZZ8J59XGyip0jPknZw
export default Signup;
