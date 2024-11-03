import React, { useEffect, useState } from 'react';
import '../container/css/AddPost.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddPost = () => {
  const isAdminLoggedIn = useSelector((state) => state.user.admin.isAdminLoggedIn);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [getData, setGetData] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null); // To track which post is being edited

  // Fetch posts from backend
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
 
    try {
      const response = await axios.get('http://localhost:3000/getPosts');
      setGetData(response.data);
    } catch (err) {
      console.log('Error fetching posts: ' + err);
    }
  };

  // Handle form submission for both add and update
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if fields are filled
    if (!title || !description || !image) {
      alert('Please fill all the fields and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      if (editingPostId) {
        // Update post
        const response = await axios.put(`http://localhost:3000/updatePost/${editingPostId}`, formData);
        if (response.status === 200) {
          alert('Post updated successfully.');
        }
      } else {
        // Add new post
        const response = await axios.post('http://localhost:3000/postData', formData);
        if (response.status === 201) {
          alert('Post created successfully.');
        }
      }

      // Reset form fields after submission
      setTitle('');
      setDescription('');
      setImage(null);
      setEditingPostId(null);

      // Fetch posts again to refresh the list
      fetchPosts();
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  // Handle post deletion
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/deletePost/${id}`);
      if (response.status === 200) {
        alert('Post deleted successfully.');
        fetchPosts(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Handle post editing (pre-fill the form with post data)
  const handleEdit = (post) => {
    setEditingPostId(post._id); // Set the editing post ID
    setTitle(post.title);
    setDescription(post.description);
    // Since images can't be directly set in an input field, leave it empty
  };

  return (
    <>
     {isAdminLoggedIn?
     (<>
     
     <div className="container_row__horizontal_crud_section">
        <table style={{color:'black'}} className='main_post_tables'>
          <thead>
            <tr className='posttable header'>
              <th>#</th>
              <th>Post Image</th>
              <th>Post Title</th>
              <th>Post Description</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {getData &&
              getData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td><img width={30} height={30} src={item.image} alt={item.title} /></td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td><button onClick={() => handleDelete(item._id)}>Delete</button></td>
                  <td><button onClick={() => handleEdit(item)}>Edit</button></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="container_post_admin">
        <div className="post_admin_image">
          <form onSubmit={handleSubmit} className='post_form_container'>
            <div className="form_group">
              <label className="form_label">Upload Image:</label>
              <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="form_input"
                accept="image/*"
              />
            </div>

            <div className="form_group">
              <label className="form_label">Title:</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter Your Title here'
                required
                className="form_input"
              />
            </div>

            <div className="form_group">
              <label className="form_label">Description:</label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Enter Description here'
                required
                className="form_input"
              />
            </div>

            <button type="submit" className="submit_button">
              {editingPostId ? 'Update Post' : 'Add Post'}
            </button>
          </form>
        </div>
      </div>
      </>):
      
       
      (<> 
      
       <h1>please lgoin as asdmin </h1>
      </>)
      }
    
    </>
  );
};

export default AddPost;
