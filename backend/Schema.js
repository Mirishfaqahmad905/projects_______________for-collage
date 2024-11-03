const mongoose = require('mongoose');
 // contact schema 

const topStudent=mongoose.Schema({
   stu_name:{
     type:String, require:true,
   },
    stu_image:{type:String,require:true},
    stu_mark:{type:String,require:true},
    total_marks:{type:String,require:true}
});

 // Define the schema for the contact form
 const ContactFormSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
 
 // Create the model from the schema

 
// Online apply form schema
const applyFormSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
  },
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
  },
  mobileNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{11}$/.test(v); // Change regex based on your mobile number format
      },
      message: props => `${props.value} is not a valid mobile number!`
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: function(v) {
        return /^\S+@\S+\.\S+$/.test(v); // Basic email regex validation
      },
      message: props => `${props.value} is not a valid email!`,
    },
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other'], // Enum for valid gender options
  },
  image: {
    type: String, // Store file path or GridFS ID
    required: [true, 'Image is required'],
  },
  cnicFile: {
    type: String, // Store CNIC file path or GridFS ID
    required: [true, 'CNIC file is required'],
  },
  dmc: {
    type: String, // Store DMC file path or GridFS ID
    required: [true, 'DMC file is required'],
  },
  domicile: {
    type: String, // Store domicile file path or GridFS ID
    required: [true, 'Domicile file is required'],
  },
  date: {
    type: Date,
    default: Date.now, // Automatically set the submission date
  },
});

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // Base64 string

  createdAt: {
    type: Date,
    default: Date.now // Automatically sets current date/time
  }
});


// Create and export the Post model

// Define the schema for Courses
const coursesSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
  },
  subjectImage: {
    type: String,
    required: true,
  },
  subjectDescription: {
    type: String,
    required: true,
  },
  subjectTime: {
    type: String,
    required: true,
  },
});

// Define the schema for Teacher
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String, // Store image URL or path as a string
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
// creating Loging Schema 
const LogingSchema= mongoose.Schema({
    email:{
       type:String,
       require:true,
    },
    password:{
       type:String,
       require:true,
   
      },
       date:{
         type:Date,
          default:Date.now()
       }
});

 const SignupSchema=mongoose.Schema({
    name:{type:String,require:true,},
    email:{type:String,require:true},
    password:{type:String,require:true},
    rePassword:{type:String,require:true}

 });
 

 const CampusSchema = new mongoose.Schema({
   campus_name: {
     type: String,
     required: true
   },
   campus_image: {
     type: String,
     required: true
   },
  //  campus_image_type: {
  //    type: String,
  //    required: true
  //  },
   campus_description: {
     type: String,
     required: true
   },
   campus_link: {
     type: String,
     required: true
   }
 });
  // event schema 
   const Events=mongoose.Schema({
      title:{type:String,require:true},
      description:{type:String,require:true},
      image:{type:String,require:true},
      date:{
        type:Date,
        default:Date.now()
      }
   })
 // admin schema 
 const admin=mongoose.Schema({
  email: { type: String, required: true },
  admin_pass: { type: String, required: true },
  role: { type: String, default: 'admin' },
 });
 // event models
  const EventModel= mongoose.model('eventTable',Events);
 const adminModel=mongoose.model('admin',admin);
 
  const campusModel= mongoose.model("campus",CampusSchema);
   // top student model
 const topStudentModel=mongoose.model('topStudents',topStudent);
// Create models based on the schemas
  const SignupModel=mongoose.model('SignupUser',SignupSchema);
const LoginModel= mongoose.model('LoginUser',LogingSchema);
const Post = mongoose.model('Post', PostSchema);
const ApplyData = mongoose.model('ApplyTable', applyFormSchema); // Renamed to ApplyData for clarity
const CoursesTables = mongoose.model('CoursesTables', coursesSchema); // Use the coursesSchema
const Teacher = mongoose.model('Teacher', teacherSchema);
const ContactForm = mongoose.model('ContactForm', ContactFormSchema);
 
// Export the models
module.exports = { Teacher, CoursesTables, ApplyData ,Post,ContactForm,LoginModel,SignupModel,campusModel,topStudentModel,adminModel,EventModel};
