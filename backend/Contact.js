// Contact.js
const ContactForm = require('./Schema');
const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = require('./env.js');
const Contact = async (req, res) => {
  const { email, message } = req.body;
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
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });
    // Define email options
    let mailOptions = {
      from: email, // The sender's email, in this case, the user's email
      to: EMAIL, // Replace with your email address where you want to receive the message
      subject: 'New Message to Our Collage',
      text: `You have a new message from ${email}:\n\nMessage: ${message}`,
    };
    // Send the email
    await transporter.sendMail(mailOptions);
    // Send success response
    res.status(200).json({
      message: "Form submitted and email sent successfully",
      data: savedContact,
    });
  } catch (error) {
    console.error("Error occurred:", error); // Log the error for debugging
    res.status(500).json({
      message: "Server error occurred: " + error.message,
    });
  }
};

// Export the function so it can be used in other files
module.exports = { Contact };
