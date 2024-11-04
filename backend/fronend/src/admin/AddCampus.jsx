import React, { useEffect, useState } from 'react';
import '../container/css/addcampus.css'; // Import the CSS file for styling
import axios from 'axios';

const AddCampus = () => {
  const [data, setData] = useState({
    name: '',
    description: '',
    link: '',
  });
  const [imageFile, setImageFile] = useState(null); // Store the new image file
  const [currentImage, setCurrentImage] = useState(null); // Store the current image
  const [campusdata, setCampusData] = useState([]);
  const [editId, setEditId] = useState(null); // To track if we are in update mode

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image file change
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Set the selected file
  };

  // Handle form submission (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('link', data.link);

    if (imageFile) {
      formData.append('image', imageFile); // Append the new image file if selected
    }

    try {
      if (editId) {
        // Update request if we are editing
        const response = await axios.put(`http://localhost:3000/updatecampus/${editId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200) {
          window.alert('Campus has been updated successfully!');
        } else {
          window.alert('Failed to update campus. Please try again.');
        }
      } else {
        // Add request if we are adding a new campus
        const response = await axios.post('http://localhost:3000/addcampus', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200) {
          window.alert('Campus has been added successfully!');
        } else {
          window.alert('Failed to add campus. Please try again.');
        }
      }

      // Clear form data and refetch campus list
      setData({ name: '', description: '', link: '' });
      setImageFile(null);
      setEditId(null);
      fetchCampusData(); // Re-fetch the data after submission
    } catch (err) {
      window.alert('Some error occurred: ' + err.message);
    }
  };

  // Function to fetch campus data
  const fetchCampusData = () => {
    axios
      .get('http://localhost:3000/getcampusData')
      .then((res) => {
        setCampusData(res.data.message);
      })
      .catch((err) => {
        console.log('Error during fetching data ' + err);
      });
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/deletecampus/${id}`);
      if (response.status === 200) {
        window.alert('Campus deleted successfully!');
        fetchCampusData(); // Refresh the data after deletion
      }
    } catch (err) {
      console.error('Error deleting campus:', err);
    }
  };

  // Handle update: Pre-populate form with selected campus data
  const handleEdit = (campus) => {
    setEditId(campus._id); // Set the edit ID
    setData({
      name: campus.campus_name,
      description: campus.campus_description,
      link: campus.campus_link,
    });
    setCurrentImage(campus.campus_image); // Set current image for preview
    setImageFile(null); // Reset image file input
  };

  useEffect(() => {
    fetchCampusData(); // Fetch data when component loads
  }, []);

  return (
    <>
      <div className="add-campus-container">
        <div className="campus_tables_">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Campus Name</th>
                <th>Campus Description</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {campusdata && 
      
                campusdata.map((campus, id) => (
                  <tr key={id}>
                    <td>{campus._id}</td>
                    <td>
                      <img
                        width={50}
                        height={50}
                        src={`data:${campus.campus_image_type};base64,${campus.campus_image}`}
                        alt={campus.campus_name}
                      />
                    </td>
                    <td>{campus.campus_name}</td>
                    <td>{campus.campus_description}</td>
                    <td>
                      <button onClick={() => handleDelete(campus._id)}>Delete</button>
                    </td>
                    <td>
                      <button onClick={() => handleEdit(campus)}>Update</button>
                    </td>
                  </tr>
                 
                ))
              
                }

            </tbody>
          </table>
        </div>

        <div className="main_campus_title">
          <h2>{editId ? 'Update Campus' : 'Add New Campus'}</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Name Input */}
            <input
              type="text"
              name="name"
              placeholder="Enter Name Of College"
              value={data.name}
              onChange={handleChange}
              required
            />

            {/* File Input */}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required={!editId} // Required only when adding a new campus
            />
            {currentImage && editId && (
              <div>
                <p>Current Image:</p>
                <img
                  width={100}
                  height={100}
                  src={`data:image/png;base64,${currentImage}`}
                  alt="Current campus"
                />
              </div>
            )}

            {/* Description Input */}
            <input
              type="text"
              name="description"
              placeholder="Enter Campus Description"
              value={data.description}
              onChange={handleChange}
              required
            />

            {/* Link Input */}
            <input
              type="text"
              name="link"
              placeholder="Enter Campus Link"
              value={data.link}
              onChange={handleChange}
            />

            {/* Submit Button */}
            <input type="submit" value={editId ? 'Update Campus' : 'Add Campus'} />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCampus;
