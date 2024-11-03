const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const { LoginModel, SignupModel } = require("./Schema"); // Import your models
const nodemailer = require('nodemailer'); // Import nodemailer
const { EMAIL, PASSWORD } = process.env; // Using environment variables

// Create the transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,       // Your email address from which the email will be sent
        pass: PASSWORD,    // Your email password or app-specific password (use environment variables)
    },
});

// Login Controller
const Login = async (req, res) => {
    const { email, password } = req.body;  // Extract email and password from the request body
    console.log('Login attempt with email:', email);  // Log the login attempt

    try {
        // Fetch the user by email
        const user = await SignupModel.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: "No account found with the provided email." });
        }

        // Log both values for debugging
        console.log('Provided password:', password);
        console.log('Stored hashed password:', user.password);

        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            // Send an email notification on successful login
            const mailOptions = {
                from: EMAIL,  // Your email
                to: email,    // User's email
                subject: 'Login Successful & Welcom To Jamal Collage of Science',
                text: `Hello ${user.name}, you have successfully logged into your account.`,
            };

            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email: ", error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });

            // Respond with success message
            return res.status(200).send({ message: "Successfully logged in and email sent!" });
        } else {
            return res.status(400).send({ message: "Invalid password. Please try again." });
        }
    } catch (error) {
        console.error("Error occurred during login: ", error);  // Log the error for debugging
        return res.status(500).send({ message: "Error occurred during login: " + error.message });
    }
};

// Signup Controller
const Signup = async (req, res) => {
    const { name, email, password, rePassword } = req.body;
    console.log(name+" "+email+""+password+" "+rePassword)

    try {
        // Check if email already exists
        const findEmail = await SignupModel.findOne({ email });

        if (findEmail) {
            return res.status(400).send({ message: "Email is already available" });
        }

        // Check if passwords match
        if (password !== rePassword) {
            return res.status(400).send({ message: "Passwords do not match" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create new signup instance
        const signupInstance = new SignupModel({
            name,
            email,
            password: hashedPassword, // Store hashed password
        });

        const savingSignupInfo = await signupInstance.save();
        
        if (savingSignupInfo) {
            return res.status(200).send({ message: "Account created successfully" });
        } else {
            return res.status(500).send({ message: "Failed to create account" });
        }
    } catch (error) {
        console.log("Error occurred during signup: ", error);
        return res.status(500).send({ message: "Error occurred during signup: " + error.message });
    }
};

module.exports = { Login, Signup };
