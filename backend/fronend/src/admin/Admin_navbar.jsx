import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './admincss/admin_navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../container/reduxToolKit/userSlice';

const Admin_navbar = () => {
  const isAdminLoggedIn = useSelector((state) => state.user.admin.isAdminLoggedIn);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility

  const handleLogout = () => {
    console.log(adminLogout());
    dispatch(adminLogout());
    window.location.href = '/admin';
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu visibility
  };

  return (
    <div>
       {isAdminLoggedIn?(<>
        <div className="navbar_links_admins">
        <h1>Admin Panel</h1>
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={`navbar_admins_ul_li ${menuOpen ? 'show' : ''}`}>
          <li><Link to={'/dashboard'}>Dashboard</Link></li>
          <li><Link to={'/addcourses'}>manage Course</Link></li>
          <li><Link to={'/addcampus'}>Add Campus</Link></li>
          <li><Link to={'/addstories'}>Add Stories</Link></li>
          <li><Link to={'/addposts'}>Manage Posts</Link></li>
          <li><Link to={'/addevent'}>Add Events</Link></li>
          <li><Link to={'/addstaffs'}>Add Staff</Link></li>
          <li><Link to={'/onlineapplyform'}>Online Forms</Link></li>
        </ul>
      </div>
       
        </>):(<>
       
       
       
       </>)}
      
    </div>
  );
};

export default Admin_navbar;
