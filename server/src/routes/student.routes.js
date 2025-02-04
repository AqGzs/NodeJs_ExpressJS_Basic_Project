const express = require("express");
const {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/student.controller");
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware(["admin", "teacher"]), getAllStudents);
router.get("/:id", authMiddleware, roleMiddleware(["admin", "teacher"]), getStudentById);
router.post("/", authMiddleware, roleMiddleware(["admin", "teacher"]), createStudent);
router.put("/:id", authMiddleware, roleMiddleware(["admin", "teacher"]), updateStudent);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteStudent);

module.exports = router;
