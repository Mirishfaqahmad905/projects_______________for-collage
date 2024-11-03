const fs = require('fs');
const path = require('path');
const { Teacher } = require('./Schema'); // Adjust the path to your Teacher schema

// Add new teacher/staff member
const Staff = async (req, res) => {
    const { name, location, description } = req.body; // Destructure request body
    const imageFile = req.file; // Get the uploaded image file

    if (!name || !location || !description || !imageFile) {
        return res.status(400).json({ message: 'Name, location, description, and image are required.' });
    }
    try {
        const uploadDir = path.join(__dirname, 'staffImage'); // Directory for saving images
        const fileName = Date.now() + '-' + imageFile.originalname; // Create unique file name
        const filePath = path.join(uploadDir, fileName); // Full path for saving the file
        // Ensure the 'staffImage' directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Move the uploaded file to 'staffImage' folder
        await fs.promises.rename(imageFile.path, filePath);

        // Read the image file as a buffer and convert to base64
        const imageBuffer = await fs.promises.readFile(filePath);
        const base64Image = imageBuffer.toString('base64');

        // Create and save new teacher data in MongoDB
        const teacherData = new Teacher({
            name,
            location,
            description,
            img: `data:${imageFile.mimetype};base64,${base64Image}`, // Store image as base64
        });

        const savedTeacher = await teacherData.save();
        res.status(201).json({ message: 'Teacher data saved successfully.', data: savedTeacher });
    } catch (error) {
        console.error('Error saving teacher data:', error);
        res.status(500).json({ message: 'Server error occurred: ' + error.message });
    }
};

// Delete teacher/staff member by ID
const delete_teacher = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStaff = await Teacher.findByIdAndDelete(id);
        if (deletedStaff) {
            return res.status(200).json({ message: "Staff member deleted successfully." });
        } else {
            return res.status(404).json({ message: "Staff member not found." });
        }
    } catch (error) {
        console.error('Error deleting staff member:', error);
        res.status(500).json({ message: 'Server error occurred: ' + error.message });
    }
};
// Update teacher/staff member by ID
const updateStaff = async (req, res) => {
  
    const { id } = req.params;
    const { name, location, description } = req.body;
    const imageFile = req.file;

    console.log(req.file); // Log the file for debugging
    try {
        const staff = await Teacher.findById(id);
        if (!staff) {
            return res.status(404).json({ message: "Staff member not found." });
        }
        // Update fields if provided in request body
        staff.name = name || staff.name;
        staff.location = location || staff.location;
        staff.description = description || staff.description;
        // Check if an image file was uploaded
        if (imageFile) {
            const uploadDir = path.join(__dirname, 'staffImage');
            // Ensure the directory exists
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir); // Create directory if it doesn't exist
            }
            const fileName = Date.now() + '-' + imageFile.originalname;
            const filePath = path.join(uploadDir, fileName);
            // Move the uploaded file
            await fs.promises.rename(imageFile.path, filePath);
            // Read and convert the new image file to base64
            const imageBuffer = await fs.promises.readFile(filePath);
            staff.img = `data:${imageFile.mimetype};base64,${imageBuffer.toString('base64')}`;
        }
        const updatedStaff = await staff.save();
        res.status(200).json({ message: "Staff member updated successfully.", data: updatedStaff });
    } catch (error) {
        console.error('Error updating staff member:', error);
        res.status(500).json({ message: 'Server error occurred: ' + error.message });
    }
};
// Get a single teacher/staff member by ID
const getStaffById = async (req, res) => {
    const { id } = req.params;
    try {
        const staff = await Teacher.findById(id);
        if (!staff) {
            return res.status(404).json({ message: "Staff member not found." });
        }
        res.status(200).json(staff);
    } catch (error) {
        console.error('Error fetching staff member:', error);
        res.status(500).json({ message: 'Server error occurred: ' + error.message });
    }
};
module.exports = { Staff, delete_teacher, updateStaff, getStaffById };
