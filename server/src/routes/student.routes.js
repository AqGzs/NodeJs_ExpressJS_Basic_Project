const express = require("express");
const {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/student.controller");
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");
const cacheMiddleware = require("../middlewares/cacheMiddleware");

const router = express.Router();

router.get("/", authMiddleware, cacheMiddleware, getAllStudents);
router.get("/:id", authMiddleware, cacheMiddleware, getStudentById);
router.post("/", authMiddleware, roleMiddleware(["admin"]), createStudent);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateStudent);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteStudent);

module.exports = router;
