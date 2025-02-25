const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');

const sendResetEmail = (email, resetToken) => {
    const transporter = nodemailer.createTransport({
        service: 'smtp@gmail.com',  // Correct service
        auth: {
            user: 'rahul658541@gmail.com',   // Your email
            pass: process.env.MAIL_PASS    // App password
        }

    });

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    const mailOptions = {
        from: 'rahul68541@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        text: `You requested a password reset.\n\n Click the following link to reset your password: ${resetUrl}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('❌ Error sending email: ', err);
        } else {
            console.log('✅ Email sent: ' + info.response);
        }
    });
};

module.exports = { sendResetEmail };
