const { sendNotification } = require("../config/websocket");

const processNotificationJob = async (job) => {
    try {
        const { userId, message } = job.data;
        sendNotification(userId, message);
        console.log(`📢 Notification sent to user ${userId}`);
    } catch (error) {
        console.error("❌ Error processing notification job:", error.message);
    }
};

module.exports = processNotificationJob;
