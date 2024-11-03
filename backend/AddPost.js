const fs = require('fs');
const path = require('path');
const { Post } = require('./Schema'); // Ensure the correct schema path
const multer=require('multer')
const addPost = async (req, res) => {
  const { title, description } = req.body;
  const imageFile = req.file; // Get the uploaded image file
  console.log('Request Body:', req.body); // Check what's received
  console.log('Uploaded File:', imageFile); // Check the uploaded file
  if (!title || !description || !imageFile) {
    return res.status(400).json({ message: 'Title, description, and image are required.' });
  }
  try {
    const filePath = path.join(__dirname, 'uploads', imageFile.filename);

    // Read image and convert to base64
    const imageBuffer = await fs.promises.readFile(filePath);
    const base64Image = imageBuffer.toString('base64');

    // Save post to MongoDB
    const newPost = new Post({

      description,
      image: `data:${imageFile.mimetype};base64,${base64Image}`, // Save image as base64
    });

    const savedPost = await newPost.save();
    res.status(201).json({ message: 'Post created successfully', data: savedPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};
// Function to get posts
const GetPost = async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};


// Function to update a post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const imageFile = req.file;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Update title and description
    post.title = title || post.title;
    post.description = description || post.description;

    // Update image if provided
    if (imageFile) {
      const filePath = path.join(__dirname, 'uploads', imageFile.filename);
      const imageBuffer = await fs.promises.readFile(filePath);
      post.image = `data:${imageFile.mimetype};base64,${imageBuffer.toString('base64')}`;
    }

    const updatedPost = await post.save();
    res.status(200).json({ message: 'Post updated successfully', data: updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

// Function to delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Extract the image base64 string to delete the file
    const base64Image = post.image.split(',')[1];
    const filePath = path.join(__dirname, 'uploads', post.title + '.jpg'); // Assuming the file is named after the post title

    // Remove image file
    fs.unlink(filePath, (err) => {
      if (err) console.log('Error deleting image file: ', err);
    });

    // Delete the post from the database
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};
module.exports = { addPost, GetPost ,updatePost,deletePost,getPostById };
