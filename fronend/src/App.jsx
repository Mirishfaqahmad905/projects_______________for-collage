import React from 'react'
import Nabvar from './container/Nabvar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './container/Home'
import Footer from './container/Footer';
import AddTeacher from './admin/addTeacher';
import TeacherStop from './container/TeacherStop';
import Courses from './container/Courses';
import AddCourses from './admin/AddCourses';
import Location from './container/Location';
import ApplyOnline from './container/ApplyOnline';
import Success from './container/Messages/Success';
import AddPost from './admin/AddPost';
import Contact from './container/Contact';
import Login from './container/Login';
import Signup from './container/Signup';
import { Provider, useSelector } from 'react-redux';
import store from './container/reduxToolKit/Store';
import AddCampus from './admin/AddCampus';
import Campus from './container/Campus';
import Events from './container/Events';
import AddStories from './admin/AddStories';
import  TopStories from './container/TopStories';
import ForGot_password from './container/Forgot_password';
import AdminLogin from './container/AdmingLogin';
import ResetPasswor from './container/Reset_password'
import Admindashboard from './admin/Admindashboard';
import OnlineForm from './admin/OnlineForm';
import Addevent from './admin/Addevent';

const App = () => {
  // const isAdminLoggedIn = useSelector((state) => state.user.admin.isAdminLoggedIn);
  return (
    <div>
   <div className="container">
     <Provider store={store}>
      <BrowserRouter>
      <Nabvar/> 
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/teacher' element={<TeacherStop/>}/>
        <Route path='/courses' element={<Courses/>}/>
        <Route path='/applyonline' element={<ApplyOnline/>}/>
        <Route path='/location' element={<Location/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/contact' element={<Contact/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/signup' element={<Signup/>}/>
         <Route path='/campus' element={<Campus/>}/>
         <Route path='/events' element={<Events/>}/>
         <Route path='/adminlogin' element={<AdminLogin/>}/>
         <Route path='/admin' element={<AdminLogin/>}/>
         <Route path='/forgot_password' element={<ForGot_password/>}/>
         <Route path='/admindashboard' element={<Admindashboard/>}/>
         <Route path='/addcampus' element={<AddCampus/>}/>
         <Route  path='/addstories' element={<AddStories/>}/>
         <Route path='/addposts' element={<AddPost/>}/>
         <Route path='/addstaffs' element={<AddTeacher/>}/>
         <Route path='/addcourses' element={<AddCourses/>}/>
         <Route path='/onlineapplyform' element={<OnlineForm/>}/>
         <Route path='/addevent' element={<Addevent/>}/>
         <Route path='/dashboard' element={<Admindashboard/>}/>
 
       </Routes>
        {/* <topStories/> */}
        {/* <AddTeacher/> */}
        {/* <AddCampus/> */}     
        <Footer/>   
                 
                 
             
              
        
    {/* <AddStories/> */} 
     {/* <AddPost/> */}

     
       </BrowserRouter>
       </Provider>
   </div>
    </div>
  )
}
export default App