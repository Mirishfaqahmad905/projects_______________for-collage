// const multer = require('multer');
// const { topStudentModel } = require('./Schema');
// const { response } = require('express');
// const path=require('path')
// // Initialize multer for file handling with memory storage
// const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory
// // Define the topStudents controller function
// const topStudents = (req, res) => {
//     // Handle file upload
//     upload.single('file')(req, res, async (err) => {
//         if (err) {
//             console.error(err);
//             return res.status(400).send("Error uploading file.");
//         }

//         try {
//             const { stories, marks, totalMarks } = req.body;

//             // Ensure that required fields are provided
//             if (!stories || !marks || !totalMarks || !req.file) {
//                 return res.status(400).send("Missing required fields.");
//             }

//             const fileBuffer = req.file.buffer; // Get the uploaded file buffer

//             // Convert buffer to Base64 string
//             const base64Image = fileBuffer.toString('base64');
//             const imageData = `data:${req.file.mimetype};base64,${base64Image}`; // Create Base64 format

//             // Create a new entry in the database
//             const newStudent = new topStudentModel({
//                 stu_name: stories,
//                 stu_mark: marks,
//                 total_marks: totalMarks,
//                 stu_image: imageData, // Save the Base64 string in the database
//             });

//             await newStudent.save();
//             res.status(201).send({ message: "Student story uploaded successfully!" });
//         } catch (error) {
//             console.error(error);
//             res.status(500).send("An error occurred while uploading the story.");
//         }
//     });
// };

// // Fetch stories from the database
// const FetchStoriesData = async (req, res) => {
//     try {
//         const students = await topStudentModel.find(); // Fetch all students
//         res.status(200).json(students);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("An error occurred while fetching students.");
//     }
// };
// const DeleteStories = async (req, res) => {
//     const { id } = req.params;

//     try {
//          if(!id || id==undefined){
//              return res.send({message:"the id are undefined"});
//          }
//         // Attempt to find and delete the document by ID
//         const deletedStory = await topStudentModel.findByIdAndDelete(id);

//         // Check if the story was successfully deleted
//         if (deletedStory) {
//             return res.status(200).json({ message: "Successfully deleted the data" });
//         } else {
//             return res.status(404).json({ message: "Data not found" });
//         }
//     } catch (error) {
//         // Log the error and return a 500 response
//         console.error("Error occurred during deletion:", error);
//         return res.status(500).json({ message: "Error occurred during deletion", error: error.message });
//     }
// };

// const updateStory = async (req, res) => {
//     const { id } = req.params; // Get student ID from URL parameters
//     const { name, marks, description } = req.body; // Get updated data from the request body

//     try {
//         // Prepare the updated data
//         const updatedData = {
//             name: name,
//             marks: marks,
//             description: description
//         };

//         // If a file (image) is uploaded, add its filename to the updated data
//         if (req.file) {
//             updatedData.image = req.file.filename;
//         }

//         // Find the document by ID and update it
//         const updatedStory = await topStudentModel.findByIdAndUpdate(id, updatedData, { new: true });

//         if (updatedStory) {
//             return res.status(200).json({
//                 message: 'Successfully updated the story',
//                 data: updatedStory
//             });
//         } else {
//             return res.status(404).json({ message: 'Student story not found' });
//         }
//     } catch (error) {
//         console.error('Error occurred during update:', error);
//         return res.status(500).json({ message: 'Error occurred during update', error: error.message });
//     }
// };
// const getStudentById = async (req, res) => {
//     const { id } = req.params; // Get student ID from URL parameters

//     try {
//         const student = await topStudentModel.findById(id); // Find student by ID

//         if (student) {
//             res.status(200).json(student); // Return the student data
//         } else {
//             res.status(404).json({ message: 'Student not found' });
//         }
//     } catch (error) {
//         console.error('Error fetching student by ID:', error);
//         res.status(500).json({ message: 'Error occurred while fetching student', error: error.message });
//     }
// };

// module.exports = { topStudents, FetchStoriesData ,DeleteStories,updateStory,getStudentById};










const multer = require('multer');
const { topStudentModel } = require('./Schema');
const path = require('path');
const fs=require('fs')
// Initialize multer for file handling with memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Add new top student story
const topStudents = (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(400).send("Error uploading file.");
        }

        try {
            const { stories, marks, totalMarks } = req.body;

            // Ensure that required fields are provided
            if (!stories || !marks || !totalMarks || !req.file) {
                return res.status(400).send("Missing required fields.");
            }

            const fileBuffer = req.file.buffer;
            const base64Image = fileBuffer.toString('base64');
            const imageData = `data:${req.file.mimetype};base64,${base64Image}`;

            // Create a new entry in the database
            const newStudent = new topStudentModel({
                stu_name: stories,
                stu_mark: marks,
                total_marks: totalMarks,
                stu_image: imageData,
            });

            await newStudent.save();
            res.status(201).send({ message: "Student story uploaded successfully!" });
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while uploading the story.");
        }
    });
};

// Fetch all student stories
const FetchStoriesData = async (req, res) => {
    try {
        const students = await topStudentModel.find();
        res.status(200).json(students);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching students.");
    }
};

// Delete student story by ID
const DeleteStories = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).send({ message: "ID is undefined" });
        }

        const deletedStory = await topStudentModel.findByIdAndDelete(id);

        if (deletedStory) {
            res.status(200).json({ message: "Successfully deleted the data" });
        } else {
            res.status(404).json({ message: "Data not found" });
        }
    } catch (error) {
        console.error("Error occurred during deletion:", error);
        res.status(500).json({ message: "Error occurred during deletion", error: error.message });
    }
};

// Update student story by ID
const updateStory = async (req, res) => {
    const { id } = req.params; 
    const { stories, marks, totalMarks } = req.body; // Adjusted field names
    const imageFile = req.file; // Ensure you have access to the uploaded file

    try {
        // Fetch the existing story to see if we have an old image to delete
        const existingStory = await topStudentModel.findById(id);
        
        if (!existingStory) {
            return res.status(404).json({ message: 'Student story not found' });
        }

        const updatedData = {
            stu_name: stories,
            stu_mark: marks,
            total_marks: totalMarks
        };

        // If a new file is uploaded, handle image upload and old image deletion
        if (imageFile) {
            // Delete the old image if it exists
            if (existingStory.image) {
                const oldImagePath = path.join(__dirname, 'uploads', existingStory.image.split(',')[0]); // Extract filename from data URL
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Error deleting old image:', err);
                    }
                });
            }

            // Read the new image file and convert it to a base64 string
            const filePath = path.join(__dirname, 'uploads', imageFile.filename);
            const imageBuffer = await fs.promises.readFile(filePath);
            updatedData.image = `data:${imageFile.mimetype};base64,${imageBuffer.toString('base64')}`;
        }

        // Update the story with new data
        const updatedStory = await topStudentModel.findByIdAndUpdate(id, updatedData, { new: true });

        // Check if the update was successful
        if (updatedStory) {
            return res.status(200).json({
                message: 'Successfully updated the story',
                data: updatedStory
            });
        } else {
            return res.status(404).json({ message: 'Student story not found' });
        }
    } catch (error) {
        console.error('Error occurred during update:', error);
        return res.status(500).json({ message: 'Error occurred during update', error: error.message });
    }
};

// Get student by ID
const getStudentById = async (req, res) => {
    const { id } = req.params;

    try {
        const student = await topStudentModel.findById(id);

        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        console.error('Error fetching student by ID:', error);
        res.status(500).json({ message: 'Error occurred while fetching student', error: error.message });
    }
};

module.exports = { topStudents, FetchStoriesData, DeleteStories, updateStory, getStudentById };
