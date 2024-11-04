import React, { useState } from 'react';
import './css/Login.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reduxToolKit/userSlice';
import Swal from 'sweetalert2';
 

const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [responseMessage, setResponseMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      return   Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No Email Or Password !",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: data.email,
        password: data.password
      });
      if (response.status===200) {
         
        dispatch(setUser({ email: data.email }));
        Swal.fire({
          title: "Good job!",
          text: "success fully Logined",
          icon: "success",
        });
        setResponseMessage('Successfully logged in');
           window.location.href='/';
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
        setResponseMessage('Login failed. Please try again.');
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
       Swal.fire("check your password and email try to write correct credential")
      setResponseMessage('An error occurred. Please try again.');
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value // Update the state with the new value
    });
  };

  return (
    <div className="main_head_container_login">
      <div className="left_container_poster_login_">
        <div className="head_poster_loging">
          <h1>Login</h1>
          <div className="image_login_poster">
            <img
              src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=740&t=st=1728919899~exp=1728920499~hmac=2c09e23b8307aeed8f9b9e0d434f14bdc3d56d9d7b8de3d4342fa2c2a256456c"
              alt="Login illustration"
            />
          </div>
        </div>
      </div>
      <div className="right_poster_login">
        <div className="container_login_main_contaaner">
          <div className="login_sub_form">
            <form onSubmit={handleSubmit}>
              <div className="container_email_field">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter Your Email Here"
                  value={data.email}
                  required // Added required attribute
                />
              </div>
              <div className="container_password_field">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  value={data.password}
                  required // Added required attribute
                />
              </div>
              <input type="submit" value="Login" />
              <button type="button" className="google-login-btn">
                Login With Google
              </button>
              <Link to={'/signup'}>I have No Account</Link>
            </form>
            <p>{responseMessage}</p> {/* Display server response */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
