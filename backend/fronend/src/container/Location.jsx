import React from 'react';
import './css/location.css'
const Location = () => {
  return (
    <div>
      <div className="collage_school_location_container">
        <div
          className="location_main_container"
          style={{ width: '1000px', height: '300px' }} // Adding units to width and height
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13090.82825215302!2d71.6637635!3d34.8887016!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38db9507a2c963a5%3A0x1f8df8033a88529b!2sJamal%20College%20of%20Sciences%20Mayar%20Jandool%20Dir%20lower!5e0!3m2!1sen!2s!4v1728633727647!5m2!1sen!2s"
            width="950"
            height="450"
            style={{ border: 0 }} // Use an object for inline styles
            allowFullScreen // Use camelCase for allowfullscreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" // Use camelCase for referrerpolicy
          ></iframe>
        
           <div className="collage_deparments">
           </div>
        </div>
      </div>
    </div>
  );
};
export default Location;
