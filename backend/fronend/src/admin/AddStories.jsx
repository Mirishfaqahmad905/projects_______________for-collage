import React, { useEffect, useState } from 'react';
import '../container/css/addStories.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
const AddStories = () => {
    const isAdminLoggedIn = useSelector((state) => state.user.admin.isAdminLoggedIn);
    const [data, setData] = useState([]);
    const [studentData, setStudentData] = useState({
        stories: '',
        marks: '',
        totalMarks: '',
        file: null,
    });
    const [editMode, setEditMode] = useState(false); // To toggle between add and edit
    const [editingId, setEditingId] = useState(null); // To store the id of the student being edited

    // Fetch all student stories
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/topStudents');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Handle form submission to add or update student story
    const submitStudentStory = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('stories', studentData.stories);
        formData.append('marks', studentData.marks);
        formData.append('totalMarks', studentData.totalMarks);
        if (studentData.file) {
            formData.append('file', studentData.file);
        }
        try {
            if (editMode) {
                // Update existing story
                const response = await fetch(`http://localhost:3000/updateStory/${editingId}`, {
                    method: 'PUT',
                    body: formData,
                });
                if (response.ok) {
                    const result = await response.text(); // Handle response as text or JSON
                    window.alert('Successfully updated the result!');
                    console.log(result);
                    setEditMode(false); // Exit edit mode
                    setEditingId(null);
                } else {
                    throw new Error('Failed to update the story.');
                }
            } else {
                // Add new story
                const response = await fetch('http://localhost:3000/topStudents', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.text(); // Handle response as text or JSON
                    window.alert('Successfully stored result!');
                    console.log(result);
                } else {
                    throw new Error('Failed to upload the story.');
                }
            }

            // Reset form and fetch updated data
            setStudentData({ stories: '', marks: '', totalMarks: '', file: null });
            fetchData();
             // Refresh the data after submission

        } catch (error) {
            console.error(error);
            alert(error.message); // Display the error to the user
        }
    };

    // Populate form with data for editing
    const editStory = (item) => {
        setStudentData({
          
            stories: item.stu_name,
            marks: item.stu_mark,
            totalMarks: item.total_marks,
            file: null, // Do not prepopulate file input for security reasons
        
        });
        setEditMode(true);
        setEditingId(item._id);
    };

    // Handle input changes
    const changeHandler = (event) => {
        const { name, value, files } = event.target;
        if (name === 'file') {
            setStudentData((prev) => ({ ...prev, file: files[0] }));
        } else {
            setStudentData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Handle deleting a story
    const deleteStory = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/deleteStories/${id}`);
            if (response.status === 200) {
                window.alert('Successfully deleted the story!');
                fetchData(); // Refresh the data after deletion
            }
        } catch (error) {
            console.error('Error deleting story:', error);
            alert('Failed to delete the story.');
        }
    };

    return (
        <>
         {isAdminLoggedIn?(<> 
            <table className='students_tables'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Student Name</th>
                        <th>Marks</th>
                        <th>Total Marks</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => (
                        <tr key={index}>
                            <td>{item._id}</td>
                            <td><img width={100} height={100} src={item.stu_image} alt="" /></td>
                            <td>{item.stu_name}</td>
                            <td>{item.stu_mark}</td>
                            <td>{item.total_marks}</td>
                            <td><button onClick={() => editStory(item)}>Edit</button></td>
                            <td><button onClick={() => deleteStory(item._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <div className="stories_form">
                    <h2>{editMode ? "Update Student Story" : "Add Student Stories"}</h2>
                    <form onSubmit={submitStudentStory}>
                        <input
                            type="text"
                            name="stories"
                            value={studentData.stories}
                            onChange={changeHandler}
                            placeholder='Enter student name'
                            required
                        />
                        <input
                            type='file'
                            name='file'
                            onChange={changeHandler}
                            required={!editMode} // Only required in add mode
                        />
                        <input
                            type='text'
                            name='marks'
                            value={studentData.marks}
                            onChange={changeHandler}
                            placeholder='Student marks'
                            required
                        />
                        <input
                            type='text'
                            name='totalMarks'
                            value={studentData.totalMarks}
                            onChange={changeHandler}
                            placeholder='Total marks'
                            required
                        />
                        <button type='submit'>
                            {editMode ? "Update Story" : "Submit"}
                        </button>
                        {editMode && (
                            <button type="button" onClick={() => {
                                // Cancel the edit mode
                                setEditMode(false);
                                setEditingId(null);
                                setStudentData({ stories: '', marks: '', totalMarks: '', file: null });
                            }}>
                                Cancel
                            </button>
                        )}
                    </form>
                </div>
            </div>
         </>)
         :(<>
         
         
          </>)}
           
        </>
    );
};

export default AddStories;
