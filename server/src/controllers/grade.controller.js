const Grade = require("../models/Grade");
const Student = require("../models/student");
const Course = require("../models/Course");
const redisClient = require("../config/redisConfig");

exports.getAllGrades = async (req, res) => {
    try {
        const grades = await Grade.find().populate("student", "name email").populate("course", "name");
        await redisClient.set(req.originalUrl, JSON.stringify(grades), { EX: 600 });
        res.json(grades);
    } catch (error) {
        res.status(500).json({ message: "Error fetching grades", error: error.message });
    }
};

exports.getGradesByStudent = async (req, res) => {
    try {
        const studentGrades = await Grade.find({ student: req.params.id })
            .populate("course", "name")
            .sort({ createdAt: -1 });

        if (!studentGrades.length) return res.status(404).json({ message: "No grades found for this student" });
        await redisClient.set(req.originalUrl, JSON.stringify(studentGrades), { EX: 600 });
        res.json(studentGrades);
    } catch (error) {
        res.status(500).json({ message: "Error fetching student's grades", error: error.message });
    }
};

exports.addGrade = async (req, res) => {
    try {
        const { student, course, score } = req.body;

        const existingStudent = await Student.findById(student);
        if (!existingStudent) return res.status(404).json({ message: "Student not found" });

        const existingCourse = await Course.findById(course);
        if (!existingCourse) return res.status(404).json({ message: "Course not found" });

        const newGrade = new Grade({ student, course, score });
        await newGrade.save();

        res.status(201).json(newGrade);
    } catch (error) {
        res.status(400).json({ message: "Error adding grade", error: error.message });
    }
};

exports.updateGrade = async (req, res) => {
    try {
        const updatedGrade = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGrade) return res.status(404).json({ message: "Grade not found" });
        res.json(updatedGrade);
    } catch (error) {
        res.status(500).json({ message: "Error updating grade", error: error.message });
    }
};

exports.deleteGrade = async (req, res) => {
    try {
        const deletedGrade = await Grade.findByIdAndDelete(req.params.id);
        if (!deletedGrade) return res.status(404).json({ message: "Grade not found" });
        res.json({ message: "Grade deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting grade", error: error.message });
    }
};
exports.invalidateGradeCache = async () => {
    await redisClient.del("/api/grades");
};
