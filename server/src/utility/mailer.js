const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: 'suyadas01331215169@gmail.com',
    pass: 'fqey yxxg opez xkzz',
  },
});


const sendMailToUser= async(to,subject,mailTemplate,user,otp,otpExpire) => {
  try {
    await transporter.sendMail({
      from: '"BlogForge" <suyadas01331215169@gmail.com>', // sender address
      to: to, // list of recipients
      subject: subject, // subject line
      html: mailTemplate(user,otp,otpExpire), // HTML body
    });
  } catch (err) {
    console.error("Error while sending mail", err);
  }
}

module.exports = sendMailToUser