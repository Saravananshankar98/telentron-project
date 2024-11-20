const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Connection Successful");
  }
});

async function sendApplicationReceivedEmail(full_name, userEmail) {
  const mailOptions = {
    from: '"Talentron" <your-email@gmail.com>',
    to: userEmail,
    subject: "Thank You for Your Interest – Here’s the Requested Information",
    html: `
            <h1>Your Application Has Been Received</h1>
            <p>Dear ${full_name || "Applicant"},</p>
            <p>I hope this message finds you well.</p>
            <p>Thank you for your interest in our Advance Training Session in Talentron.We appreciate your interest and the time you’ve taken to submit your details.</p>
            <p>Rest assured, we will review your application promptly and get back to you with a response as soon as possible.</p>
            <p>Thank you again, and we look forward to connecting with you soon.</p>
            <p>Best Regards,
            <br>Saravanan S.
            <br>Talentron</p>
        `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
  }
}

module.exports = { sendApplicationReceivedEmail };
