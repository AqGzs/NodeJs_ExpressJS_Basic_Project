const express = require("express");
const {
    getAllGrades,
    getGradesByStudent,
    addGrade,
    updateGrade,
    deleteGrade
} = require("../controllers/grade.controller");
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getAllGrades);
router.get("/:id", authMiddleware, getGradesByStudent);
router.post("/", authMiddleware, roleMiddleware(["admin", "teacher"]), addGrade);
router.put("/:id", authMiddleware, roleMiddleware(["admin", "teacher"]), updateGrade);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteGrade);

module.exports = router;
