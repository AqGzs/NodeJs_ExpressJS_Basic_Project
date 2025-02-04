const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const studentRoutes = require("./student.routes");
const courseRoutes = require("./course.routes");
const gradeRoutes = require("./grade.routes");
//const teacherRoutes = require("./teacher.routes");

router.get("/", (req, res) => {
    res.send("API is running...");
});

router.use("/auth", authRoutes);
router.use("/students", studentRoutes);
router.use("/courses", courseRoutes);
router.use("/grades", gradeRoutes);
//outer.use("/teachers", teacherRoutes);

module.exports = router;
