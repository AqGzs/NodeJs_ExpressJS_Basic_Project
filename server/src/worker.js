const emailQueue = require("./config/queueConfig");
const processEmailJob = require("./jobs/emailJob");

emailQueue.process(processEmailJob);

console.log("🚀 Email queue worker started...");
