const { adminModel } = require('./Schema'); // Import the admin model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// JWT secret key (store securely in production)
const JWT_SECRET = process.env.JWT_SECRET || "123321"; // Use env variable for production

// Setup nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Use your email from env variables
    pass: process.env.PASSWORD // Use your email password from env variables
  }
});

// Admin login function
const adminLogin = async (req, res) => {
  const { email, admin_pass } = req.body;

  try {
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(admin_pass, admin.admin_pass);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      admin: { email: admin.email, role: admin.role }
    });
  } catch (error) {
    console.error("Login error: ", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Forgot password function
const Forgot_password = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    // Generate a reset token (valid for 1 hour)
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });

    // Password reset URL
    const resetUrl = `http://localhost:5173/reset_password?token=${token}`;

    // Send the password reset email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'RESET PASSWORD',
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.status(200).json({ message: 'Password reset email sent' });
    });
  } catch (error) {
    console.error("Error in forgot password: ", error);
    res.status(500).json({ message: 'Server error', error });
  }
};
// Reset password function
const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    const adminId = decoded.id;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update admin's password in the database
    await adminModel.findByIdAndUpdate(adminId, { admin_pass: hashedPassword });

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error("Error resetting password: ", error);
    res.status(500).json({ message: 'Invalid or expired token', error });
  }
};

// Admin signup function
const singUpAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new adminModel({
      email,
      admin_pass: hashedPassword,
      role: 'admin' // Assign a default role
    });

    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error("Error signing up admin: ", error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { adminLogin, Forgot_password, resetPassword, singUpAdmin };
