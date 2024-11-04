import React, { useState } from 'react';
import './css/ApplyOnline_form.css';
import axios from 'axios';  // Using Axios to send data to the backend
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const ApplyOnline = () => {
  const IsLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    mobileNumber: '',
    email: '',
    gender: '',
    image: null,
    cnicFile: null,
    dmc: null,
    domicile: null,
  });
  const [loading, setLoading] = useState(false);  // Loading state for submission
  const [successMessage, setSuccessMessage] = useState('');  // To show messages

  // Handle text input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0], // Store the file object
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formPayload = new FormData();
    // Append form data
    for (const key in formData) {
      if (formData[key]) {
        formPayload.append(key, formData[key]);
      }
    }

    try {
      // Validate required fields
      if (Object.values(formData).some(field => field === null || field === '')) {
        Swal.fire({
          title: "Make Sure All fields are filled",
          icon: 'warning',
          confirmButtonText: 'OK',
        });
        setLoading(false);
        return;
      }

      // Make POST request to backend
      const response = await axios.post('http://localhost:3000/applyForm', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setLoading(false);
      // Handle success response
      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        Swal.fire({
          title: 'Success!',
          text: 'Your information has been submitted. Thank you!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        // Clear form fields
        setFormData({
          fullName: '',
          fatherName: '',
          mobileNumber: '',
          email: '',
          gender: '',
          image: null,
          cnicFile: null,
          dmc: null,
          domicile: null,
        });
      }
    } catch (error) {
      setLoading(false);
      // Check for duplicate email or mobile number
      if (error.response && error.response.status === 400) {
        if (error.response.data.message === 'Email or mobile number is already registered.') {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email or mobile number is already registered! Please use a different one.",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "An error occurred. Please try again.",
            icon: 'error',
          });
        }
      } else {
        Swal.fire({
          title: "Error",
          text: "An unexpected error occurred. Please try again.",
          icon: 'error',
        });
      }
      console.error('Error submitting form: ', error);
    }
  };

  return (
    <div>
      {IsLoggedIn ? (
        <>
          <div className="container_form_users_banner">
            <img height={100}
              src="https://static.vecteezy.com/system/resources/previews/024/255/837/non_2x/apply-onlines-sign-level-bubble-speech-apply-online-vector.jpg"
              alt="Banner"
            />
          </div>
          <div className="header_apply_online_form">
            <h1>Fill the Given Form</h1>
          </div>
          {successMessage && <div className="success_message">{successMessage}</div>}
          <form onSubmit={handleSubmit} className="container_apply_online">
            {/* Full Name */}
            <div className="apply_section_name">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                id="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>

            {/* Father Name */}
            <div className="apply_section_father_name">
              <label htmlFor="fatherName">Father Name</label>
              <input
                type="text"
                name="fatherName"
                placeholder="Enter your father's name"
                id="fatherName"
                required
                value={formData.fatherName}
                onChange={handleInputChange}
              />
            </div>

            {/* Mobile Number */}
            <div className="apply_mobile_number">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input
                type="number"
                name="mobileNumber"
                id="mobileNumber"
                placeholder="Enter Mobile Number"
                required
                value={formData.mobileNumber}
                onChange={handleInputChange}
              />
            </div>

            {/* Email */}
            <div className="apply_email_number">
              <label htmlFor="email">Enter Your Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Upload Files */}
            <div className="file-upload">
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="file-upload">
              <label htmlFor="cnicFile">Upload CNIC</label>
              <input
                type="file"
                name="cnicFile"
                id="cnicFile"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="file-upload">
              <label htmlFor="dmc">Upload DMC</label>
              <input
                type="file"
                name="dmc"
                id="dmc"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="file-upload">
              <label htmlFor="domicile">Upload Domicile</label>
              <input
                type="file"
                name="domicile"
                id="domicile"
                onChange={handleFileChange}
                required
              />
            </div>

            {/* Gender Selection */}
            <div className="apply_gender_selection">
              <label htmlFor="gender">Select Gender</label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <button type="submit" className="apply_button" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </>
      ) : (
        <div className="false_side_container">
          <button className='custom-button'
            onClick={() => (window.location.href = '/login')} 
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
          >
            Please Login to Apply Online
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplyOnline;
