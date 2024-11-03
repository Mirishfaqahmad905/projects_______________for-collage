import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const OnlineForm = () => {
    const isAdminLoggedIn = useSelector((state) => state.user.admin.isAdminLoggedIn);
    const [applyFormData, setApplyFormData] = useState([]);
    const [error, setError] = useState(null);
   const [message,setMessage]=useState();
   const [subject,setSubject]=useState();
    useEffect(() => {
        fetchApplicationData();
    }, []);

    const fetchApplicationData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/apply/getapplyformdata');
            setApplyFormData(response.data.message);
        } catch (err) {
            console.error("Error fetching application data:", err);
            setError("Failed to fetch application data. Please try again.");
        }
    };

    const downloadStudentData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/apply/download_formdata/${id}`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${id}_data.zip`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error downloading student data:", error);
        }
    };
    const sendMessageToAll = () => {
        axios.post('http://localhost:3000/apply/sendMessageToAll',{
           subject:subject,
           message:message
        })
            .then((res) => {
                if (res.status === 200) {
                    window.alert('All students have been notified by message successfully.');
                }
            })
            .catch(error => {
                console.error("Error sending message to all students:", error);
                window.alert("Failed to send messages. Please try again.");
            });
    };
     // deleting the route
     const DeleteIt=(id)=>{
       axios.delete(`http://localhost:3000/delete_form_student_apply/${id}`).then((re)=>{
         if(re.status==200){
            return window.alert("successfully deleted");
         }
       }).catch((err)=>{
         console.log('failed to deleted the data'+err);
       })
     }

    return (
        <div>
   {isAdminLoggedIn ? (<>
    {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {/* Buttons for sending email and message to all students */}
         
            <h1>Send mail to All students</h1>
             <form action="" >
               <input type="text" name="" onChange={(e)=>setSubject(e.target.value)} placeholder='Write title of the message || subject' id="" />
               <input type="text" name="" onChange={(e)=>setMessage(e.target.value)} placeholder='Write message to all applicant' id="" />
               <button onClick={sendMessageToAll}>Send Message to All</button>
             </form>
            
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Father Name</th>
                        <th>Mobile Number</th>
                        <th>Email</th>
                        <th>Student Image</th>
                        <th>Domicile</th>
                        <th>NIC</th>
                        <th>DMC</th>
                        <th>Gender</th>
                         <th>delete</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applyFormData.map((data) => (
                        <tr key={data._id}>
                            <td>{data.fullName}</td>
                            <td>{data.fatherName}</td>
                            <td>{data.mobileNumber}</td>
                            <td>{data.email}</td>
                            <td><img src={`http://localhost:3000/${data.image}`} alt="Student" style={{ width: '50px', height: '50px' }} /></td>
                            <td><img src={`http://localhost:3000/${data.domicile}`} alt="Domicile" style={{ width: '50px', height: '50px' }} /></td>
                            <td><img src={`http://localhost:3000/${data.nic}`} alt="NIC" style={{ width: '50px', height: '50px' }} /></td>
                            <td><img src={`http://localhost:3000/${data.dmc}`} alt="DMC" style={{ width: '50px', height: '50px' }} /></td>
                            <td>{data.gender}</td>
                            <td><button onClick={()=>DeleteIt(data._id)}>Delete</button></td>
                            <td>
                                <button onClick={() => downloadStudentData(data._id)}>Download All</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
   </>):(<>
 <h1>login as admin </h1>
   
   
   </>)}
          
        </div>
    );
};

export default OnlineForm;
