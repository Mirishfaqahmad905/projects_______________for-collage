import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../container/css/topStories.css'; // Assuming you have a CSS file for styling
const TopStories = () => {
    const [data, setData] = useState([]);
 console.log(data);
    const fetchStoriesData = () => {
        axios.get('http://localhost:3000/topStudents')
            .then((response) => {
                setData(response.data); // Assuming the response is an array of stories
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    useEffect(() => {
        fetchStoriesData();
    }, []);
    return (
        <>
        

                   <h1 style={{textAlign:'center'}}>Position Holder Of the Current Year  </h1>
        <div className="stories-container">
       
       {data.length > 0 ? (
           data.map((student, index) => (
               <div key={index} className="container_stories_header">
                   <div className="stories_main_container_image">
                   <img src={student.stu_image} alt={student.stu_name} />

                   </div>
                   <div className="stories_image_title_name">
                       <div className="name">
                           <p>{student.stu_name}</p>
                       </div>
                       <div className="marks_total">
                           <p>{student.stu_mark} out of {student.total_marks}</p>
                       </div>
                   </div>
               </div>
           ))
       ) : (
           <p>No stories available.</p>
       )}
   </div>   
        
        </>
     
    );
};

export default TopStories;
