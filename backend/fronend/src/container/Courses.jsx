import React, { useEffect, useState } from 'react';
import './css/courses.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
const Courses = () => {
  // Initialize `data` as an empty array to avoid errors when mapping
  const [data, setData] = useState([]);

  // Fetch data using useEffect
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getCoursesData');
        setData(response.data);
         console.log(response.data)
      } catch (error) {
        console.log('Error occurred while fetching data:', error);
      }
    };
    fetchdata(); // Call the fetchdata function
  }, []);

  return (
    <div>
     <div className="programe_header_titles">  <h1>We are Offering Different Programs</h1></div>
      <div className="container_student_programs_subjects">
        {/* Render data using map, and make sure to return JSX */}
        {data.length > 0 ? (
          data.map((course, id) => (
            <div key={id} className="container_main_student_program">
              <div className="image_of_courses">
                {/* Use the `subjectImage` field from your data */}
                <img
  src={
    course.subjectImage && course.subjectImage.startsWith("data:")
      ? course.subjectImage // Use as-is if already a complete data URL
      : `data:image/jpeg;base64,${course.subjectImage}` // Otherwise, format as base64 data URL
  }
  alt={course.subjectName}
/>

              </div>
              <div className="subject_name">
                <p>{course.subjectName}</p>
              </div>
              <div className="subject_name">
                 <p>{course.subjectDescription}</p>
              </div>
              <div className="subject_time_total">
                <time>Total Time: {course.subjectTime}</time>
              </div>
            </div>
          ))
        ) : (
          <p>Loading courses...</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
