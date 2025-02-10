const { emailQueue, notificationQueue } = require("../config/queueConfig");

const queueEmail = async (to, subject, text, html = "") => {
    try {
        await emailQueue.add({ to, subject, text, html });
        console.log(`📨 Email queued for ${to}`);
    } catch (error) {
        console.error("❌ Error queuing email:", error.message);
    }
};

const queueNotification = async (userId, message) => {
    try {
        await notificationQueue.add({ userId, message });
        console.log(`📢 Notification queued for user ${userId}`);
    } catch (error) {
        console.error("❌ Error queuing notification:", error.message);
    }
};

module.exports = { queueEmail, queueNotification };
