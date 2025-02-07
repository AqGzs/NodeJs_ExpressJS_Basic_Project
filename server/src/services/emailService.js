const emailQueue = require("../config/queueConfig");

const sendEmail = async (to, subject, text, html = "") => {
    try {
        await emailQueue.add({ to, subject, text, html });
        console.log(`📨 Email queued for ${to}`);
    } catch (error) {
        console.error("❌ Error queuing email:", error.message);
    }
};

module.exports = { sendEmail };
