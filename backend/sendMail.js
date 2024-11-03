// Import nodemailer package
const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",  // Ethereal email host
    port: 587,                    // Port for Ethereal SMTP
    secure: false,                // true for 465, false for other ports
    auth: {
        user: 'bernhard.moore@ethereal.email',  // Your Ethereal email user
        pass: 'nyQEEETqQkzK4Vcc2n',            // Your Ethereal email password
    }
});

// Async function to send the email
async function main() {
    try {
        // Send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',  // Sender's email and name
            to: "bar@example.com, baz@example.com",                      // List of recipients
            subject: "Hello my name is Mir ✔",                           // Email subject
            text: "Hello world, my name is Mir Ishfaq Ahmad.",            // Plain text body
            html: "<b>Hello world, my name is Mir Ishfaq Ahmad.</b>",     // HTML body
        });

        console.log("Message sent: %s", info.messageId);  // Log message ID
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));  // Preview URL for testing (useful for Ethereal)
    } catch (error) {
        console.error("Error sending email: ", error);  // Handle errors
    }
}

// Call the main function to send the email
main().catch(console.error);

// Export the transporter object (optional, for further use in other files)
module.exports = { transporter };
