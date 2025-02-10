const express = require("express");
const { sendAnnouncementEmail } = require("../controllers/email.controller");
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/announcement", authMiddleware, roleMiddleware(["admin"]), sendAnnouncementEmail);


module.exports = router;
