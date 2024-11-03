const { CoursesTables } = require('./Schema');
const path = require('path');
const fs = require('fs');

// Add Course

const EditCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { subjectName, subjectDescription, subjectTime } = req.body;
    const imageFile = req.file;

    let imageData = null;
    if (imageFile) {
      const filePath = path.join(__dirname, 'CoursesImage', imageFile.filename);
      const imageBuffer = await fs.promises.readFile(filePath);
      imageData = `data:${imageFile.mimetype};base64,${imageBuffer.toString('base64')}`;
    }

    const updatedCourse = await CoursesTables.findByIdAndUpdate(
      id,
      {
        subjectName,
        subjectDescription,
        subjectTime,
        ...(imageData && { subjectImage: imageData }),
      },
      { new: true }
    );

    if (updatedCourse) {
      res.status(200).json({ message: "Course updated successfully", data: updatedCourse });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Error updating course" });
  }
}

const AddCourses = async (req, res) => {
  const { subjectName, subjectDescription, subjectTime } = req.body;
  const coursesImage = req.file;

  if (!subjectName || !subjectDescription || !subjectTime || !coursesImage) {
    return res.status(400).json({ message: "All fields, including description and image, are required" });
  }

  try {
    // Convert image to base64
    const filepath = path.join(__dirname, 'CoursesImage', coursesImage.filename);
    const imageBuffer = await fs.promises.readFile(filepath);
    const savebase64Image = `data:${coursesImage.mimetype};base64,${imageBuffer.toString('base64')}`;

    // Save the course data to the database
    const saveCourse = new CoursesTables({
      subjectName,
      subjectImage: savebase64Image,
      subjectDescription,
      subjectTime
    });
    const savedCourse = await saveCourse.save();
    res.status(200).json({ message: "Course successfully added", data: savedCourse });
  } catch (error) {
    res.status(500).json({ message: "An error occurred: " + error.message });
  }
};

// Get All Courses
const getCourseData = async (req, res) => {
  try {
    const courses = await CoursesTables.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error occurred in retrieving courses: " + error.message });
  }
};

// Delete Course by ID
const DeleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCourse = await CoursesTables.findByIdAndDelete(id);
    if (deletedCourse) {
      res.status(200).json({ message: "Course deleted successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
      console.log('coursenot found')
    }
  } catch (error) {
    console.log("Error occurred during deletion: " + error.message);
    res.status(500).json({ message: "Error occurred during deletion" });
  }
};

// Edit Course by ID
module.exports = { AddCourses, getCourseData, DeleteCourse, EditCourse };
