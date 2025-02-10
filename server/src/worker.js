const { emailQueue, notificationQueue } = require("./config/queueConfig");
const processEmailJob = require("./jobs/emailJob");
const processNotificationJob = require("./jobs/notificationJob");

emailQueue.process(processEmailJob);
console.log("🚀 Email queue worker started...");

notificationQueue.process(processNotificationJob);
console.log("🚀 Notification queue worker started...");
