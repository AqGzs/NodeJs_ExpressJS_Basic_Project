const express = require("express");
const {
    getAllTeachers,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher
} = require("../controllers/teacher.controller");
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getAllTeachers);
router.get("/:id", authMiddleware, getTeacherById);
router.post("/", authMiddleware, roleMiddleware(["admin"]), createTeacher);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateTeacher);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteTeacher);

module.exports = router;
