import React, { useEffect, useState } from 'react';
import '../container/css/addteacher.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
const AddTeacher = () => {
    const isAdminLoggedIn = useSelector((state) => state.user.admin.isAdminLoggedIn);
    const [data, setMyData] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        image: null, // Start with null for the image
        location: '',
        description: ''
    });
    const [editMode, setEditMode] = useState(false); // Track whether we are editing a teacher
    const [editId, setEditId] = useState(null); // Store the ID of the teacher being edited

    const changeHandler = (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                image: e.target.files[0] // Handle file input for the image
            });
        } else {
            setFormData({
                ...formData,
                [name]: value // Handle text inputs
            });
        }
    };

    const submitForm = async (e) => {
        e.preventDefault();
        const { name, location, description, image } = formData;

        // Check if all fields are filled
        if (!name || !location || !description || (!image && !editMode)) {
            alert('Please fill all fields and upload an image');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('location', location);
        formDataToSend.append('description', description);
        if (image) formDataToSend.append('image', image); // Only append the image if it's being updated or added
        try {
            if (editMode) {
                console.log(editMode)
                // If editMode is true, send a PUT request to update the teacher
                await fetch(`http://localhost:3000/updateStaffById/${editId}`, {
                    method: 'PUT',
                    body: formDataToSend
                });
                alert('Teacher updated successfully');
            } else {
                // Else send a POST request to add a new teacher
                await fetch('http://localhost:3000/addteacher', {
                    method: 'POST',
                    body: formDataToSend
                });
                alert('Teacher added successfully');
            }
            window.location.reload(); // Reload the page after submission
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form');
        }

        // Reset the form fields after submission
        setFormData({
            name: '',
            image: null,
            location: '',
            description: ''
        });
        setEditMode(false); // Exit edit mode after submission
        setEditId(null); // Clear the ID after submission
    };

    useEffect(() => {
        // Fetch the teacher data on component mount
        axios.get("http://localhost:3000/getData")
            .then((res) => {
                setMyData(res.data);
            })
            .catch((err) => {
                console.error("Error fetching teacher data:", err);
            });
    }, []);

    const Edit = (item) => {
        // Populate the form with the selected teacher's data for editing
        setFormData({
            name: item.name,
            location: item.location,
            description: item.description,
            image: null // Image needs to be re-uploaded if user wants to change it
        });
        setEditMode(true); // Enable edit mode
        setEditId(item._id); // Store the ID of the teacher being edited
    };

    const DeleteStaff = (id) => {
        if (window.alert("Are you sure you want to delete this staff member?")) {
            axios.delete(`http://localhost:3000/delete_teacherstaff/${id}`)
                .then((response) => {
                    if (response.status === 200) {
                        alert("Successfully deleted the staff member");
                        window.location.reload(); // Reload the page after deletion
                    }
                })
                .catch((error) => {
                    console.error('Error deleting staff:', error);
                    alert("Failed to delete staff");
                });
        }
    };

    return (
        <>
         {isAdminLoggedIn?(

            <>
 <div className="table_teacher_crud">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, index) => (
                            <tr key={index}>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td><img width={100} height={100} src={item.img} alt="" /></td>
                                <td>{item.description}</td>
                                <td>{item.location}</td>
                                <td><button onClick={() => Edit(item)}>Edit</button></td>
                                <td><button onClick={() => DeleteStaff(item._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="container_teacher_form">
                <h2>{editMode ? 'Update Teacher' : 'Add Teacher'}</h2>
                <div className="teacher_forms">
                    <form onSubmit={submitForm}>
                        <div className="name_form_teacher">
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter teacher's name"
                                value={formData.name} // Bind input to state
                                onChange={changeHandler}
                                required
                            />
                        </div>
                        <div className="image_form_teacher">
                            <input
                                type="file"
                                name="image"
                                onChange={changeHandler}
                                required={!editMode} // Image is required only if not in edit mode
                            />
                        </div>
                        <div className="location_form_teacher">
                            <input
                                type="text"
                                name="location"
                                placeholder="Enter location"
                                value={formData.location} // Bind input to state
                                onChange={changeHandler}
                                required
                            />
                        </div>
                        <div className="description_form_teacher">
                            <input
                                type="text"
                                name="description"
                                placeholder="Enter description"
                                value={formData.description} // Bind input to state
                                onChange={changeHandler}
                                required
                            />
                        </div>
                        <button type="submit">{editMode ? 'Update' : 'Submit'}</button>
                    </form>
                </div>
            </div>
            </>
 
         ):
         
         <>
          <h1>please login as admin contact with developers </h1>
         
         </>
         }
           
        </>
    );
};

export default AddTeacher;
