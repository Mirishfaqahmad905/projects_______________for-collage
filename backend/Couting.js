// Import all models
const { Teacher, CoursesTables, ApplyData, Post, ContactForm, LoginModel, SignupModel, campusModel, topStudentModel, adminModel, EventModel } = require('./Schema');

const getTableCounts = async (req, res) => {
  try {
    // Retrieve document counts from each collection in parallel
    const [
      teacherCount,
      coursesCount,
      applyDataCount,
      postCount,
      contactFormCount,
      loginCount,
      signupCount,
      campusCount,
      topStudentCount,
      adminCount,
      eventCount
    ] = await Promise.all([
      Teacher.countDocuments(),
      CoursesTables.countDocuments(),
      ApplyData.countDocuments(),
      Post.countDocuments(),
      ContactForm.countDocuments(),
      LoginModel.countDocuments(),
      SignupModel.countDocuments(),
      campusModel.countDocuments(),
      topStudentModel.countDocuments(),
      adminModel.countDocuments(),
      EventModel.countDocuments()
    ]);

    // Return the counts in a structured JSON response
    res.status(200).json({
      teacherCount,
      coursesCount,
      applyDataCount,
      postCount,
      contactFormCount,
      loginCount,
      signupCount,
      campusCount,
      topStudentCount,
      adminCount,
      eventCount
    });
  } catch (error) {
    console.error("Error retrieving table counts:", error);
    res.status(500).json({ message: "Error retrieving table counts", error });
  }
};

module.exports = { getTableCounts };
