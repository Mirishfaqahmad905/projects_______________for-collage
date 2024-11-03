const { ApplyData } = require('./Schema');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const nodemailer=require('nodemailer');
 const Mailgen=require('mailgen')
const { EMAIL, PASSWORD } = require('./env.JS');
// Function to get all student application data
const applyForm = async (req, res) => {
    console.log("Receiving the request");
    try {
        const getFormData = await ApplyData.find();
        if (getFormData.length > 0) {
            res.status(200).send({ message: getFormData });
        } else {
            res.status(404).send({ message: 'No data found' });
        }
    } catch (error) {
        console.error("Error occurred while fetching data:", error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Function to download all student data and documents as a ZIP file
const downloadFormData = async (req, res) => {
    const { id } = req.params;

    try {
        const studentData = await ApplyData.findById(id);
        if (!studentData) {
            return res.status(404).send({ message: 'Student data not found' });
        }

        const imagePath = path.resolve(studentData.image);
        const cnicPath = path.resolve(studentData.cnicFile);
        const dmcPath = path.resolve(studentData.dmc);
        const domicilePath = path.resolve(studentData.domicile);

        // Set up ZIP archive
        const zipFileName = `${studentData.fullName}_data.zip`;
        res.set({
            'Content-Type': 'application/zip',
            'Content-Disposition': `attachment; filename="${zipFileName}"`,
        });

        const archive = archiver('zip', { zlib: { level: 9 } });
        archive.pipe(res);

        // Add files to the archive
        const addFileToArchive = (filePath, fileName) => {
            if (fs.existsSync(filePath)) {
                archive.file(filePath, { name: fileName });
            } else {
                console.error(`File does not exist: ${filePath}`);
            }
        };

        addFileToArchive(imagePath, `${studentData.fullName}_image.jpg`);
        addFileToArchive(cnicPath, `${studentData.fullName}_cnic.jpg`);
        addFileToArchive(dmcPath, `${studentData.fullName}_dmc.pdf`);
        addFileToArchive(domicilePath, `${studentData.fullName}_domicile.pdf`);

        archive.finalize();
    } catch (error) {
        console.error("Error occurred while creating ZIP for download:", error.message);
        res.status(500).send({ message: 'Error occurred while downloading student data' });
    }
};

// Function to download an individual file as base64 by file type
const downloadFile = async (req, res) => {
    const { id, type } = req.params;

    try {
        const studentData = await ApplyData.findById(id);
        if (!studentData) {
            return res.status(404).send({ message: 'Student data not found' });
        }

        let filePath, fileName;
        switch (type) {
            case 'image':
                filePath = path.resolve(studentData.image);
                fileName = `${studentData.fullName}_image.jpg`;
                break;
            case 'cnic':
                filePath = path.resolve(studentData.cnicFile);
                fileName = `${studentData.fullName}_cnic.jpg`;
                break;
            case 'dmc':
                filePath = path.resolve(studentData.dmc);
                fileName = `${studentData.fullName}_dmc.pdf`;
                break;
            case 'domicile':
                filePath = path.resolve(studentData.domicile);
                fileName = `${studentData.fullName}_domicile.pdf`;
                break;
            default:
                return res.status(400).send({ message: 'Invalid file type' });
        }

        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath);
            const base64Data = fileData.toString('base64');

            res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
            res.status(200).send(base64Data);
        } else {
            res.status(404).send({ message: 'File not found' });
        }
    } catch (error) {
        console.error("Error downloading file:", error.message);
        res.status(500).send({ message: 'Error occurred while downloading file' });
    }
};
const NotifyAllStudents = async (req, res) => {
    const { subject, message } = req.body;

    console.log('Subject:', subject);
    console.log('Message:', message);

    if (!message) {
        return res.status(400).send({ message: "The message is undefined or empty." });
    }

    try {
        // Fetch all student emails and full names from the ApplyData table
        const allApplicants = await ApplyData.find({}, 'email fullName');
        const applicantEmails = allApplicants.map(applicant => ({ email: applicant.email, fullName: applicant.fullName }));

        // Set up nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, // Environment variable for email
                pass: process.env.PASSWORD // Environment variable for password
            }
        });

        // Configure Mailgen
        const mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Jamal College of Science",
                link: "https://jamalcollegeofsciencemayar.com"
            }
        });

        // Iterate through all applicants to send emails
        for (const { email, fullName } of applicantEmails) {
            // Define email content for each applicant
            const emailContent = {
                body: {
                    name: fullName,
                    intro: "Welcome to Jamal College of Science!",
                    table: {
                        data: [
                            {
                                item: "Hello dear applicant!",
                                description: message // Properly insert the dynamic message
                            }
                        ]
                    },
                    outro: "Looking forward to seeing you achieve great things with us!"
                }
            };

            // Generate HTML email content
            const emailBody = mailGenerator.generate(emailContent);

            // Email message configuration
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: subject,
                html: emailBody
            };

            // Send email
            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${email}`);
        }

        res.status(200).send({ message: "All emails sent successfully!" });
        console.log("All emails sent successfully!");

    } catch (error) {
        console.error("An error occurred while sending emails:", error);
        res.status(500).send({ message: "An error occurred while sending emails. Please try again later." });
    }
};
 const Delete_apply=async(req,res)=>{
     const {id}=req.params; 
    try {
          const deleted_form_data= await ApplyData.findByIdAndDelete(id);
          if(deleted_form_data){
            return res.status(200).send({message:"deleted successfully "});
          }
          
     } catch (error) {
         console.log('deleted the form data');
     }
 }
// Exporting the modules
module.exports = { applyForm, downloadFormData, downloadFile,NotifyAllStudents,Delete_apply};
