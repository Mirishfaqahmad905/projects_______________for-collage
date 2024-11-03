import React, { useState ,useEffect} from 'react';
import './admincss/Event.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Addevent = () => {
  const isAdminLoggedIn = useSelector((state) => state.user.admin.isAdminLoggedIn);
  const [data,setData]=useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const HandleSubmitEvent = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('description', description);
    formdata.append('image', image);
    console.log(formdata)

    fetch('http://localhost:3000/postevents', {
      method: 'POST',
      body: formdata,
    })
      .then((res) => {
        if (res.status === 200) {
          window.alert('Successfully posted the event');
          setTitle("");
          setDescription("");
          setImage(null);
        } else {
          window.alert('Failed to post the event');
        }
      })
      .catch((error) => console.error('Error:', error));
       setTitle("");
       setImage("");
       setDescription("");

  };
 useEffect(() => {
    axios.get('http://localhost:3000/geteventdata').then((res)=>{
         setData(res.data.message);
         console.log(data);
    }).catch((err)=>{
       console.log("error are accured"+err);
    })
 }, [])
 const deleteEvent=async(id)=>{
    axios.delete(`http://localhost:3000/deleteevent/${id}`).then((res)=>{
       if(res.status==200){
         window.alert('post deleted successfully');
       }
    }).catch((err)=>{
       console.log('error are accured '+err);
    })
 }
 
  return (
     <>
     {isAdminLoggedIn ? (<>
      <div style={{display:'flex',flexWrap:'wrap'}}>
      <div className="event_container__">
        <div className="dev_center" style={{ textAlign: 'center' }}>Add Events</div>
        <form onSubmit={HandleSubmitEvent}>
          <input 
            type="text" 
            name="event title" 
            placeholder="Enter the event title" 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <input 
            type="text"  
            name="description" 
            placeholder="Event description goes here" 
            onChange={(e) => setDescription(e.target.value)} 
          />
          <input 
            type="file" 
            name="image"  
            accept="image/*" 
            onChange={(e) => setImage(e.target.files[0])} 
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Event Image</th>
            <th>Event Title</th>
            <th>Event Description</th>
            <th>Delete Event</th>
          </tr>
        </thead>
        <tbody>
           {
             data && data.map((item,index)=>(
                <>
                  <tr key={index}>
                  <td>{item._id}</td>
                  <td> <img src={`data:image/jpeg;base64,${item.image}`} alt="Event" width="100" height="100" /></td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td><button onClick={()=>deleteEvent(item._id)}>Delete Events</button></td>
          </tr>
                </>
             ))
           }
        </tbody>
      </table>
    </div>
     
     </>):
     (<> 
     
     
     </>)}

   
    </>
  );
};

export default Addevent;
