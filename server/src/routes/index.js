const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");

router.use("/auth", authRoutes);

router.get("/", (req, res) => {
    res.send("API is running...");
});

module.exports = router;
