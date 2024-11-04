import React, { useState, useEffect } from 'react';
import './css/TeacherStop.css';
import axios from 'axios';

const TeacherStop = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getData");
      setData(response.data); // Set the fetched data (array) into state
      console.log(response.data); // Logging the data for verification
    } catch (err) {
      console.log(err + " error occurred in fetching data.");
    }
  };

  // Use useEffect to call fetchData when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
         <h1 style={{textAlign:'center'}}> School Stops member </h1>
      <div className="container_teacher_stop_">
        {data.length > 0 ? (
          data.map((teacher, index) => (
            <div className="container_teacher_container" key={index}>
              <div className="div_image_container_for_teacher">
                <img src={teacher.img || ''} alt="Teacher" />
              </div>
              <div className="container_totle_">
                <small>{teacher.name || 'Title'}</small>
              </div>
              <div className="description_container_for_user">
                <p>{teacher.description || 'Image container for the user'}</p>
              </div>
              <div className="small_address">
                <small>{teacher.location || 'Address'}</small>
              </div>
            </div>
          ))
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default TeacherStop;
