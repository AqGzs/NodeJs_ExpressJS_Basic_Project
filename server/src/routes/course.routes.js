const express = require("express");
const {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollStudent
} = require("../controllers/course.controller");
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getAllCourses);
router.get("/:id", authMiddleware, getCourseById);
router.post("/", authMiddleware, roleMiddleware(["admin", "teacher"]), createCourse);
router.put("/:id", authMiddleware, roleMiddleware(["admin", "teacher"]), updateCourse);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteCourse);
router.post("/:id/enroll", authMiddleware, roleMiddleware(["admin", "teacher"]), enrollStudent);

module.exports = router;
