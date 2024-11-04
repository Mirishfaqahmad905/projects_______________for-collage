import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './admincss/adminDashboard.css';
import { adminLogout } from '../container/reduxToolKit/userSlice';
import { useDispatch, useSelector } from 'react-redux';
const Admindashboard = () => {
  const isAdminLoggedIn = useSelector((state) => state.user.admin.isAdminLoggedIn);
  const [countData, setCountData] = useState(null); // state for count data
const dispatch=useDispatch();
  useEffect(() => {
    // Fetch the table counts from the API
    axios.get('http://localhost:3000/gettablecount')
      .then((res) => {
        setCountData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching table counts:", err);
      });
  }, []);
  const handleLogout=()=>{
    dispatch(adminLogout())
    window.location.href='/';
  }
  return (
 <>
{isAdminLoggedIn ? (<> 
  <div className="dashboard-container">
      <div className="header-dashboard">
        <h1>Dashboard for Jamal College of Science</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <div className="count-cards-container">
        {/* Check if countData is available before rendering */}
        {countData ? (
          Object.entries(countData).map(([key, value]) => (
            <div className="count-card" key={key}>
              <h3>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
              <p>{value}</p>
            </div>
          ))
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
</>):
(<>

<h1>Login as admin  or go back to dashboard</h1>

 </>)}
   
    </>
  );
}

export default Admindashboard;
