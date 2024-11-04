
const express = require('express');
const fs=require('fs');
const cors = require('cors');
const nodemailer = require('nodemailer');
const {Staff,delete_teacher,getStaffById,updateStaff}=require('./AddTeacher');
const Mailgen = require('mailgen');
const { applyForm,downloadFormData, downloadFile ,NotifyAllStudents,Delete_apply}=require('./ApplyForm');
const multer = require('multer'); // To handle file uploads
const path = require('path');
const { EMAIL, PASSWORD } = require('./env.JS'); // Assuming you have the credentials here
const { Teacher, CoursesTables, ApplyData, Post ,ContactForm} = require('./Schema'); // Importing models
const {Contact}= require('./Contact');
const {Login,Signup}=require('./creadentail');
const {EventDelete,PostEvents,getDatafromEvents}=require('./Events');
const {AddCampus,getcampusData,updateCampus,deleteCampus,getcampusById}=require('./AddCampus');
const  {topStudents , FetchStoriesData,DeleteStories,updateStory,getStudentById}=require('./TopStudents');
const {adminLogin,Forgot_password,resetPassword} =require('./admin');
const {addPost,GetPost,updatePost,deletePost,getPostById} =require('./AddPost');
const {getTableCounts}=require('./Couting');
const { AddCourses, getCourseData ,DeleteCourse,EditCourse}=require('./addCourses');
const Connection = require('./conection'); // Database connection setup
const PORT=process.env.PORT || 3000
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
// Configure multer for file uploads (destination folder and filenames)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads'); // Define the uploads directory
    cb(null, uploadPath); // Files will be saved in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s/g, '_'); // Unique filename
    cb(null, uniqueName); // Save with unique name (timestamp)
  },
});
const upload = multer({ dest: 'uploads/' });
const events=multer({dest:'events/'});
const uploadCourseImage = multer({ storage: multer.diskStorage({
  destination: (req, file, cb) => {
    const courseImagePath = path.join(__dirname, 'CoursesImage'); // Set directory for course images
    cb(null, courseImagePath); // Save in 'CoursesImage' directory
  },
  filename: (req, file, cb) => {
    const uniqueImageName = Date.now() + '-' + file.originalname.replace(/\s/g, '_'); // Unique name
    cb(null, uniqueImageName);
  }
})});
// edit the course image
app.put('/editCourse/:id', uploadCourseImage.single('courseImage'), EditCourse);


 // deleting the course
app.delete('/deleteCourse/:id',DeleteCourse);
// Add courses route (corrected field name)
app.post("/addCourses", uploadCourseImage.single('courseImage'), AddCourses);
//get coursedata
app.get('/getCoursesData',getCourseData);
// get table counting 
app.get("/gettablecount",getTableCounts);
// get event data 
 app.get('/geteventdata',getDatafromEvents);
 // post events 
  app.post('/postevents',events.single('image'),PostEvents);
  // delete events
  app.delete('/deleteevent/:id',EventDelete);
// const upload = multer({ storage: storage });
//delete the formstudent data
app.delete('/delete_form_student_apply/:id',Delete_apply);
 // send message to all student 
  app.post('/apply/sendMessageToAll',NotifyAllStudents);
// Download individual file (e.g., image, CNIC, DMC, domicile)
app.get('/download_file/:type/:id', downloadFile);

// Download all apply form data as a ZIP
app.get('/download_formdata/:id', downloadFormData);

// Get all student application data
app.get('/apply/getapplyformdata', applyForm);

           // update the etacher stff controller
app.put('/updateStaffById/:id', upload.single('image'), updateStaff);

        app.get('/getStaffByid/:id',getStaffById);
    // updatecmapus
  app.put('/updatecampus/:id',upload.single('image'),updateCampus);
  // delete campus
  app.delete('/deletecampus/:id',deleteCampus);
  // getcampusByid
   app.get('/getcampusbyid',getcampusById);
// update the post by post id 
// get campus data 
// get post by id 
app.get('/getPost/:id', getPostById);
// 
app.put('/updatePost/:id', upload.single('image'), updatePost);
// Delete a post by ID
app.delete('/deletePost/:id', deletePost);
 // reset password
 app.post('/reset_password',resetPassword);
// forgot password route
 app.post('/forgotpassword',Forgot_password);
 // delete_teacher
app.delete('/delete_teacherstaff/:id',delete_teacher);
// add teacher staff
app.post('/addteacher', upload.single('image'), Staff); // Use multer middleware to handle file upload
// adming schema 
app.post('/admin',adminLogin);
 // update stoires 
 app.put('/updateStory/:id', upload.single('file'), updateStory);
 // getting student data by id 
 app.get('/getStudent/:id', getStudentById);

 // add stories
  app.delete('/deleteStories/:id',DeleteStories);
 // fetching top student data 
  app.get('/topStudents',FetchStoriesData);
 // adding student route
 app.post('/topStudents',topStudents);
// campus Route
app.post('/addcampus', upload.single('image'), AddCampus);
 app.get('/getcampusData',getcampusData);
// adding post
app.post('/postData', upload.single('image'), addPost);
app.get('/getPosts',GetPost);
 // Login  route
 app.post('/login',Login);
 // signup route
 app.post('/signup',Signup);
if(process.env.NODE_ENV=="production")
{
   app.use(express.static('fronend/dist'))
}

// const __dirname_ = path.resolve();

// // Serve static files from the frontend/dist directory
// app.use(express.static(path.join(__dirname_, 'fronend', 'dist')));

// // Serve index.html for any route
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'fronend', 'dist', 'index.html'));
// });

// contact post
// Contact form submission route
app.post('/user/contact', async (req, res) => {
  // Destructure email and message from the request body

  const { email, message } = req.body;

  // Validate required fields
  if (!email || !message) {
    return res.status(400).json({ message: "Email and message are required." });
  }

  try {
    // Create a new document using the ContactForm schema
    const contactData = new ContactForm({
      email: email,
      message: message,
    });

    // Save the document to the database
    const savedContact = await contactData.save();

    // Set up Nodemailer to send email
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL, // Your email address
        pass: PASSWORD, // Your email password or app-specific password
      },
    });

    // Define email options
    let mailOptions = {
      from: email, // The sender's email, which is the user's email
      to: EMAIL, // Your email address to receive the contact form submissions
      subject: 'New Contact Form Submission',
      text: `You have a new message from ${email}:\n\nMessage: ${message}`, // The content of the email
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Send success response
    res.status(200).json({
      message: "Form submitted and email sent successfully",
      data: savedContact, // Return the saved contact data
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error occurred:", error); 
    // Send error response
  }
});
// GET route to retrieve teacher data
app.get('/getData', async (req, res) => {
  try {
    const teachers = await Teacher.find(); // Retrieve all teacher data
    res.status(200).json(teachers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occurred in fetching data: " + error.message });
  }
});

// POST route for adding course data

app.post('/applyForm', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'cnicFile', maxCount: 1 },
  { name: 'dmc', maxCount: 1 },
  { name: 'domicile', maxCount: 1 }
]), async (req, res) => {
  const { fullName, fatherName, mobileNumber, email, gender } = req.body;

  try {
    // Check if email or mobile number is already registered
    const existingUser = await ApplyData.findOne({
      $or: [{ email }, { mobileNumber }]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email or mobile number is already registered.' });
    }

    // Validate required files
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No files were uploaded.' });
    }

    // Function to encode files in base64 format
    const encodeFileToBase64 = (filePath) => {
      const file = fs.readFileSync(filePath);
      return file.toString('base64');
    };

    // Extract and encode files
    const image = req.files['image'] ? encodeFileToBase64(req.files['image'][0].path) : null;
    const cnicFile = req.files['cnicFile'] ? encodeFileToBase64(req.files['cnicFile'][0].path) : null;
    const dmc = req.files['dmc'] ? encodeFileToBase64(req.files['dmc'][0].path) : null;
    const domicile = req.files['domicile'] ? encodeFileToBase64(req.files['domicile'][0].path) : null;

    // Create a new application entry
    const applicationData = new ApplyData({
      fullName,
      fatherName,
      mobileNumber,
      email,
      gender,
      image,
      cnicFile,
      dmc,
      domicile,
    });

    // Save the new application data
    const savedForm = await applicationData.save();
    res.status(200).json({ message: 'Form submitted successfully', data: savedForm });

    // Set up email transporter with Nodemailer
    const config = {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // Ensure to use environment variables
        pass: process.env.PASSWORD
      }
    };

    const transporter = nodemailer.createTransport(config);

    // Set up Mailgen for generating email content
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Jamal College of Science",
        link: "https://jamalcollegeofsciencemayar.com"
      }
    });

    // Email content
    const response = {
      body: {
        name: fullName,
        intro: "Welcome to Jamal College of Science!",
        table: {
          data: [
            {
              item: "Hello dear user",
              description: "We are so happy to see you. Welcome to our college."
            }
          ]
        }
      }
    };

    // Generate the email body
    const emailBody = mailGenerator.generate(response);

    // Send the email
    const message = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Successfully received your application',
      html: emailBody
    };

    await transporter.sendMail(message);
    console.log("Successfully sent the email");

    // Clean up temporary uploaded files
    Object.values(req.files).forEach(fileArray => {
      fileArray.forEach(file => {
        const filePath = file.path;
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (error) {
            console.error(`Error deleting file at ${filePath}:`, error);
          }
        } else {
          console.warn(`File not found, skipping deletion: ${filePath}`);
        }
      });
    });

  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      console.error('Validation Error:', error);
      return res.status(400).json({ message: 'Validation Error: ' + error.message });
    }

    // Log and return server errors
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
});
// Start the server on port 3000
app.listen(PORT, () => {
  console.log('Server is running on port '+PORT);
});
