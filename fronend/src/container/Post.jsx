import React, { useEffect, useState } from 'react';
import '../container/css/Post.css'; // Assuming you have CSS for Post component

const Post = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/getPosts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
     <div className="container_post_head">
       <h3 style={{textAlign:'center'}} >Upadtes</h3>
       <marquee direction="left">Welcom to the Collage  of science and technology </marquee>
     </div>
    <div className='main_post_container'>
      {posts.map((post) => (
        <div key={post._id} className="container_post_main_container">
          <div className="post_image_section">
            {/* Ensure image path is correct, prepend base URL if needed */}
            <img 
              src={post.url || post.image} 
              alt={post.title} 
            />
          </div>
          <div className="post_title_section">
            <h2>{post.title}</h2>
          </div>
          <div className="post_description_section">
            <p>{post.description}</p>
            <small>{new Date(post.createdAt).toLocaleString()}</small> {/* Assuming createdAt field exists */}
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Post;
