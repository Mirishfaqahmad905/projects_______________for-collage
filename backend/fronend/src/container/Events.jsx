import React, { useEffect, useState } from 'react';
import Event from '../json/Events';
import './css/Events.css'; // Make sure to link your CSS file
import axios from 'axios';
const Events = () => {
  const [data, setData] = useState();
  console.log(data);
   useEffect(()=>{
     axios.get('http://localhost:3000/geteventdata').then((res)=>{
       setData(res.data.message);
     }).catch((err)=>{
       console.log("error accured"+err);
     })
   },[]);
  return (
    <div>
      <h1>Our Events</h1>
      <div className="container_event_day">
        {
         data &&
        data.map((event, index) => (

      <>
       
          <div
            className={`container_main_card_event ${index % 2 === 0 ? 'reverse' : ''}`}
            key={index}
          >
            
            <div className="image_section_event_">
              <img src={`data:image/jpeg;base64,${event.image}`} alt={event.name} />
            </div>
            <div className="container_event_header_title">
              <div className="header_h1_title">
                <h3>{event.title}</h3>
              </div>
              <div className="description_events">
                <div className="content_events">
                  <p>{event.description}</p>
                </div>
              </div>
            </div>
          </div>
           </>
        ))}
      </div>
    </div>
  );
};

export default Events;
