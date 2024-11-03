import React from 'react'
import Hero from './Hero'
import TeacherStop from './TeacherStop';
import './css/Home.css';
import Post from './Post';
import TopStories from './TopStories';
const Home = () => {
  return (
    <div>
         {<Hero/>}
         <div className="welcome-section">
                <h1>Welcom To Jamal Collage Of Science Mayar </h1>
            </div>
            <TopStories/> 
          <Post/>
         <div>
        
            
        </div>
    </div>
  )
}

export default Home