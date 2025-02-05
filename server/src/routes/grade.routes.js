const express = require("express");
const {
    getAllGrades,
    getGradesByStudent,
    addGrade,
    updateGrade,
    deleteGrade
} = require("../controllers/grade.controller");
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");
const cacheMiddleware = require("../middlewares/cacheMiddleware");

const router = express.Router();

router.get("/", authMiddleware,cacheMiddleware ,getAllGrades);
router.get("/:id", authMiddleware,cacheMiddleware, getGradesByStudent);
router.post("/", authMiddleware, roleMiddleware(["admin", "teacher"]), addGrade);
router.put("/:id", authMiddleware, roleMiddleware(["admin", "teacher"]), updateGrade);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteGrade);

module.exports = router;
