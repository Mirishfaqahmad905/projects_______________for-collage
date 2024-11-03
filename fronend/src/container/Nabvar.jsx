import React, { useState } from 'react'; // Use useState to handle the toggle
import { Link } from 'react-router-dom';
import images_log from '../images/logo.jpg'
import './css/Navbar.css';
import { useDispatch, useSelector } from 'react-redux'; // To access Redux store state
import Swal from 'sweetalert2'
import { logout } from './reduxToolKit/userSlice';
import Admin_navbar from '../admin/Admin_navbar';
import { CiHome } from "react-icons/ci";
const Navbar = () => {
   const [state,setState]=useState();
  // State to track whether the mobile menu is active or not
  const [menuActive, setMenuActive] = useState(false);
  const disptach=useDispatch();
  // Access Redux store to check if user is logged in and to get the user's email
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn); // Check login status
  const email = useSelector((state) => state.user.user.email); // Access user's email from Redux
  const isAdminLoggedIn = useSelector((state) => state.user.admin.isAdminLoggedIn);
 console.log(isAdminLoggedIn)
 console.log(isUserLoggedIn);
  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setMenuActive(!menuActive); // Toggle between true and false for mobile menu visibility
  };
  const LogOutUser=()=>{
     disptach(logout());
     Swal.fire({
      title: "!",
      text: "LogOut!",
      icon: "success",
    });
 }
  return (
    <>
    
     {isAdminLoggedIn ? (
      <>
     <h1>admin logged in </h1>
       <Admin_navbar/>
       </>
     ):(
      <> 
  
  <div className='container_navbar'>
      <div className="logo_collage">
        <img style={{borderRadius:60}} src={images_log} alt="Collage Logo" />
      </div>

      {/* Hamburger Menu Button */}
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰ {/* This is the hamburger icon */}
      </button>
      {/* Navigation Links: The 'active' class is applied based on the menuActive state */}
      <div className={`container_links ${menuActive ? 'active' : ''}`}>
        <ul className="navbar_links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/campus">Campuses</Link></li>
          <li><Link to="/applyonline">Apply </Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/teacher">Staff </Link></li>
          <li><Link to="/events"> events</Link></li>
          <li> <Link to={'/admindashboard'}></Link></li>
          <li> <Link to={'/admindashboard'}></Link></li>
          <li> <Link to={'/forgot_password'}></Link></li>
          <li> <Link to={'/reset_password_'}></Link></li>
          <li><Link to={'/resume'}></Link></li>
          {/* Conditional rendering based on user's login status */}
          {isUserLoggedIn==true ? (
            <>
              <li><Link to="/">{email}</Link></li> {/* Display email if logged in */}
              <li><Link to="/" onClick={LogOutUser}>LogOut</Link></li> {/* Add logout functionality as needed */}
            </>
          ) : (
            <>
              <li><Link to="/admin">Login</Link></li>
              <li><Link to="/signup">signup</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
      
      </>
     )}
  
    </>
  );
};

export default Navbar;
