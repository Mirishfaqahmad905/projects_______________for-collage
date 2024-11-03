const { campusModel } = require('./Schema'); // Schema import
const multer = require('multer');
const fs = require('fs'); // Required for reading the file from disk
const path = require('path');

// Set up multer to store the image in disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './CampusImage'); // Specify the uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Use unique filename
  }
});
const upload = multer({ storage: storage });

// AddCampus function to handle adding a new campus with image upload
const AddCampus = async (req, res) => {
  const { name, description, link } = req.body;
  const fileImage = req.file; // This is the uploaded image file
  console.log('Request Body:', req.body);
  console.log('Request File:', req.file);

  if (!fileImage) {
    return res.status(400).send({ message: 'Image file is required.' });
  }

  try {
    // Read the image file from disk
    const imagePath = fileImage.path;
    const imageBuffer = fs.readFileSync(imagePath); // Read the file
    const base64Image = imageBuffer.toString('base64'); // Convert to base64 string

    // Create a new campus document
    const campusData = new campusModel({
      campus_name: name,
      campus_image: base64Image, // Store the image as a base64 string in MongoDB
      campus_image_type: fileImage.mimetype, // Store the image type to display correctly in frontend
      campus_description: description,
      campus_link: link
    });

    // Save the campus data to the database
    const savedCampusData = await campusData.save();

    if (savedCampusData) {
      res.status(200).send({ message: 'Successfully saved the campus data.', data: savedCampusData });
    } else {
      res.status(400).send({ message: 'Error occurred while saving the data.' });
    }
  } catch (error) {
    console.error('Error occurred during the AddCampus operation:', error);
    res.status(500).send({ message: 'An error occurred while saving the campus data.' });
  }
};

// GetCampusData function to fetch all campus data
const getcampusData = async (req, res) => {
   console.log("campus request")
  try {
    const campusData = await campusModel.find();
    res.send({message:campusData})
   console.log("campus data "+campusData)
  } catch (err) {
    console.error('Error fetching campus data:', err);
    res.status(500).send({ message: 'An error occurred while fetching the campus data.' });
  }
};
// UpdateCampus function to handle updating a campus entry, including image replacement
const updateCampus = async (req, res) => {
  const { id } = req.params;
  const { name, description, link } = req.body;

  try {
    // Find the existing campus entry by ID
    let campus = await campusModel.findById(id);
    if (!campus) {
      return res.status(404).send('Campus not found');
    }

    // Update campus fields if provided
    campus.campus_name = name || campus.campus_name;
    campus.campus_description = description || campus.campus_description;
    campus.campus_link = link || campus.campus_link;

    // Handle image update only if a new file is uploaded
    if (req.file) {
      // Construct the path of the old image
      const oldImageFilename = campus.campus_image_filename; // Access the old image filename
      if (oldImageFilename) { // Check if old image filename exists
        const oldImagePath = path.join(__dirname, 'CampusImage', oldImageFilename);

        // Check if the old image file exists before attempting to delete it
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Delete the old image file
        }
      }

      // Update the campus image with the new file
      const newImageBuffer = fs.readFileSync(req.file.path); // Read new image file
      const base64Image = newImageBuffer.toString('base64'); // Convert to base64 string

      // Save the image data
      campus.campus_image = base64Image; // Store the new image as a base64 string
      campus.campus_image_filename = req.file.filename; // Store the new image filename for future reference
      campus.campus_image_type = req.file.mimetype; // Store the new image type
    }

    // Save the updated campus data
    await campus.save();
    res.status(200).send({ message: 'Campus updated successfully', data: campus });
  } catch (error) {
    console.error('Error occurred during the updateCampus operation:', error);
    res.status(500).send('Internal Server Error');
  }
};

// DeleteCampus function to delete a campus
const deleteCampus = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCampus = await campusModel.findByIdAndDelete(id);
    if (deletedCampus) {
      res.status(200).send({ message: 'Deleted campus successfully.' });
    } else {
      res.status(404).send({ message: 'Campus post not found.' });
    }
  } catch (error) {
    console.error('Error occurred during deleteCampus operation:', error);
    res.status(500).send({ message: 'An error occurred while deleting the campus data.' });
  }
};

// GetCampusById function to fetch a single campus by its ID
const getcampusById = async (req, res) => {
  const { id } = req.params;

  try {
    const campusData = await campusModel.findById(id);
    if (!campusData) {
      return res.status(404).send({ message: 'Campus data not found.' });
    }
    return res.status(200).send(campusData);
  } catch (err) {
    console.error('Error occurred during getcampusById operation:', err);
    res.status(500).send({ message: 'An error occurred while fetching the campus data.' });
  }
};

module.exports = { AddCampus, getcampusData, updateCampus, deleteCampus, getcampusById };
