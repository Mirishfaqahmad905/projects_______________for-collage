import React, { useState } from 'react';
import '../container/css/contact.css'; // Ensure the CSS file is imported correctly
import Location from './Location';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

// import {Swal} from 'sweetalert2'
const Contact = () => {
 const email=useSelector((state)=>state.user.user.email);
 const isLoggedIn=useSelector((state)=>state.user.isLoggedIn)

  const [data, setData] = useState({
    email: '',
    message: '',
  });
  const [receivingMessage, setReceivingMessage] = useState(null); // For storing response messages
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:3000/user/contact', {
        email: data.email,
        message: data.message,
      });

      if (response.status === 200) {
        // Show success message if status is OK
        // Swal.fire({
        //   title: "Good job!",
        //   text: "thank we have received your email !",
        //   icon: "success"
        // });
           alert('successfully received you text sms  ')
        setReceivingMessage("Form submitted successfully. We will get back to you soon!");
        setData({ email: '', message: '' }); // Clear the form after successful submission
      }
    } catch (error) {
      // Handle errors and display an appropriate message
      setReceivingMessage("An error occurred while submitting the form. Please try again later.");
      console.error("Submission error:", error); // Log the error for debugging
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Location />

      <div className="container_contact_box">
        <div className="left_side_location">
          <div className="location_info">
            <h2>Our College is near Mayar Main Bazar</h2>
            <p>Main Street</p>
            <p>City, Country 12345</p>
            <p>Email: contact@example.com</p>
            <p>Phone: +1234567890</p>
          </div>
        </div>

        <div className="right_side_contact_form">
          <div className="right_side_header">
            <h3>Please Contact Us</h3>
          </div>
   { 

  isLoggedIn ?(<>
   
   <form onSubmit={handleSubmit}>
            <label htmlFor="email">Enter Your Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter Your Email" 
              value={data.email || email}
              onChange={handleChange}
              required 
            />

            <label htmlFor="message">Your Message</label>
            <textarea
              name="message"
              placeholder="Write Your Message Here"
              value={data.message}
              onChange={handleChange}
              required
            />

            <input type="submit" value="Submit" />
          </form>
  </>):(
    <>
         <button onClick={()=>window.location.href='/login'} >Please Login To Contact </button>
    </>
  )

   }

          {/* Display success/error message */}
          {receivingMessage && (
            <p className="message_response">{receivingMessage}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Contact;
