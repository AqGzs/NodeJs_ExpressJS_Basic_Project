const express = require("express");
const {
    getAllTeachers,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher
} = require("../controllers/teacher.controller");
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");
const cacheMiddleware = require("../middlewares/cacheMiddleware");

const router = express.Router();

router.get("/", authMiddleware, cacheMiddleware,getAllTeachers);
router.get("/:id", authMiddleware,cacheMiddleware ,getTeacherById);
router.post("/", authMiddleware, roleMiddleware(["admin"]), createTeacher);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateTeacher);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteTeacher);

module.exports = router;
