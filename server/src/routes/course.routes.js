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
const cacheMiddleware = require("../middlewares/cacheMiddleware");

const router = express.Router();

router.get("/", authMiddleware,cacheMiddleware ,getAllCourses);
router.get("/:id", authMiddleware,cacheMiddleware ,getCourseById);
router.post("/", authMiddleware, roleMiddleware(["admin", "teacher"]), createCourse);
router.put("/:id", authMiddleware, roleMiddleware(["admin", "teacher"]), updateCourse);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteCourse);
router.post("/:id/enroll", authMiddleware, roleMiddleware(["admin", "teacher"]), enrollStudent);

module.exports = router;
