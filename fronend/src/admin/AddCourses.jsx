import React, { useEffect, useState } from 'react';
import '../container/css/Addcourses.css';
import axios from 'axios';

const AddCourses = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [courseName, setCourseName] = useState('');
  const [courseImage, setCourseImage] = useState(null);
  const [subjectDescription, setSubjectDescription] = useState('');
  const [timerOfCourse, setCourseTimer] = useState('');

  // Submit or Update Course Data
  const submitData = async () => {
    const formData = new FormData();
    formData.append("subjectName", courseName);
    formData.append("courseImage", courseImage);
    formData.append("subjectDescription", subjectDescription);
    formData.append("subjectTime", timerOfCourse);

    try {
      let response;
      if (editingId) {
        // Edit Course if editingId is set
        response = await axios.put(`http://localhost:3000/editCourse/${editingId}`, formData);
        if (response.status === 200) {
          window.alert('Course updated successfully');
        }
      } else {
        // Add New Course
        response = await axios.post('http://localhost:3000/addCourses', formData);
        if (response.status === 200) {
          window.alert('Course added successfully');
        }
      }

      setEditingId(null); // Reset editing state
      fetchCourses(); // Refresh courses list
      resetForm(); // Reset the form
    } catch (err) {
      console.log("Error occurred: " + err);
    }
  };

  // Fetch Courses Data
  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:3000/getCoursesData');
      setData(res.data);
    } catch (err) {
      console.log('Error occurred while fetching data: ' + err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Delete Course Data
  const deleteData = async (_id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/deleteCourse/${_id}`);
      if (res.status === 200) {
        window.alert("The course has been successfully deleted");
        fetchCourses(); // Refresh courses list
      }
    } catch (err) {
      console.log("Error occurred: " + err);
    }
  };

  // Edit Course Data
  const editExistingCourse = (item) => {
    setCourseName(item.subjectName);
    setCourseImage(item.subjectImage);
    setSubjectDescription(item.subjectDescription);
    setCourseTimer(item.subjectTime);
    setEditingId(item._id);
  };

  // Reset Form Fields
  const resetForm = () => {
    setCourseName('');
    setCourseImage(null);
    setSubjectDescription('');
    setCourseTimer('');
    setEditingId(null);
  };

  return (
    <div>
      <h1>{editingId ? "Edit Course" : "Add Course"}</h1>
      <div className="courses_main_container">
        <div className="courses_form_data">
          <input
            type="text"
            name="name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter course name"
          />
        </div>
        <div className="courses_form_data">
          <input
            type="file"
            name="image"
            onChange={(e) => setCourseImage(e.target.files[0])}
            placeholder="Upload the image of the subject"
          />
        </div>
        <div className="courses_form_data">
          <input
            type="text"
            name="description"
            value={subjectDescription}
            onChange={(e) => setSubjectDescription(e.target.value)}
            placeholder="Enter subject description"
          />
        </div>
        <div className="courses_form_data">
          <input
            type="text"
            name="time"
            value={timerOfCourse}
            onChange={(e) => setCourseTimer(e.target.value)}
            placeholder="Enter total subject time"
          />
        </div>
        <button className="submitData" onClick={submitData}>
          {editingId ? "Update Course" : "Submit"}
        </button>
      </div>
      <div className="div_tables">
        <table className="course_tables__">
          <thead className='course_table_header'>
            <tr className='course_table_row'>
              <th>ID</th>
              <th>Image</th>
              <th>Course Name</th>
              <th>Course Description</th>
              <th>Total Time</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item, index) => (
              <tr key={index}>
                <td>{item._id}</td>
                <td>
                <img
  src={
    item.subjectImage && item.subjectImage.startsWith("data:")
      ? item.subjectImage // Use as-is if already a complete data URL
      : `data:image/jpeg;base64,${item.subjectImage}` // Otherwise, format as base64 data URL
  } width={300} height={200}
  alt={item.subjectName}
/>

                </td>
                <td>{item.subjectName}</td>
                <td>{item.subjectDescription}</td>
                <td>{item.subjectTime}</td>
                <td><button onClick={() => editExistingCourse(item)}>Edit</button></td>
                <td><button onClick={() => deleteData(item._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddCourses;
