/**
 * Email Router Module
 *
 * This module handles the email-sending functionality using Nodemailer and Express.js.
 * It defines a route for processing user-submitted contact form data and sending emails.
 */

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

/**
 * Route to send an email.
 * 
 * @route POST /send - Sends an email with user-submitted contact information.
 * @param {string} firstname - The first name of the sender.
 * @param {string} lastname - The last name of the sender.
 * @param {string} email - The email address of the sender.
 * @param {string} text - The message content to be sent.
 * 
 * @returns {Object} JSON response indicating success or failure of email sending.
 */
router.post('/send', async (req, res) => {
    const { firstname, lastname, email, text } = req.body;

    // Validate input fields
    if (!firstname || !lastname || !email || !text) {
        return res.status(400).json({ message: 'Please fill every field correctly.' });
    }

    // Configure email transporter using Gmail SMTP
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sonyplaydeals@gmail.com',
            pass: 'qpyd onjm exvc kimw'
        }
    });

    // Define email options
    let mailOptions = {
        from: 'sonyplaydeals@gmail.com',
        to: 'sonyplaydeals@gmail.com',
        subject: `Contact Us! From: ${firstname} ${lastname} Email: ${email}`,
        text: text
    };

    // Attempt to send the email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error(`Error while sending Email:`, error);
        res.status(500).json({ message: 'Failed to send email.' });
    }
});

module.exports = router;
