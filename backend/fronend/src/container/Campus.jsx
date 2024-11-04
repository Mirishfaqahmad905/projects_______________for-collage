import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/campus.css'
const Campus = () => {
  const [campusData, setCampusData] = useState([]); // Set default value as an empty array

  const fetchCampusData = () => {
    axios.get('http://localhost:3000/getcampusData')
      .then((response) => {
        setCampusData(response.data.message);
         console.log("the campus data are ")
        console.log(response.data.message); // Log the fetched data for debugging
      })
      .catch((err) => {
        console.error("An error occurred on the frontend: ", err);
      });
  };

  useEffect(() => {
    fetchCampusData();
  }, []); // Empty array to ensure it runs once on component mount

  return (
    <div>
      <h1>Our Campuses</h1>
      <div className="container_jmc_campus_main_container">
        { campusData &&
        campusData.length > 0 ? (
          campusData.map((item, index) => (
            <div className="campus_sub_container_" key={index}>
              <div className="campus_main_head_title">
                <h4>{item.campus_name}</h4>
              </div>
              <div className="image_campus_">
                <img  src={`data:${item.campus_image_type};base64,${item.campus_image}`}  alt={item.campus_name} />
              </div>
              <div className="campus_description_">
                <p>{item.campus_description}</p>
              </div>
              <div className="visit_button">
                <button onClick={() => window.location.href = item.campus_link}>Visit</button>
              </div>
            </div>
          ))
        ) : (
          <p>No campus data available</p>
        )}
      </div>
    </div>
  );
};

export default Campus;
