const transporter = require("../config/emailConfig");

const processEmailJob = async (job) => {
    try {
        const { to, subject, text, html } = job.data;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html
        };

        await transporter.sendMail(mailOptions);
        console.log(`📩 Email sent to ${to}`);
    } catch (error) {
        console.error("❌ Error sending email:", error.message);
    }
};

module.exports = processEmailJob;
