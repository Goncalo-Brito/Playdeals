const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send', async (req, res) => {
    const { firstname, lastname, email, text } = req.body;

    if (!firstname || !lastname || !email || !text) {
        return res.status(400).json({ message: 'Please fill every field correctly.' });
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sonyplaydeals@gmail.com',
            pass: 'qpyd onjm exvc kimw'
        }
    });

    let mailOptions = {
        from: 'sonyplaydeals@gmail.com',
        to: 'sonyplaydeals@gmail.com',
        subject: `Contact Us! From: ${firstname} ${lastname} Email: ${email}`,
        text: text
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error(`Error while sending Email:`, error);
        res.status(500).json({ message: 'Failed to send email.' });
    }
});

module.exports = router;
