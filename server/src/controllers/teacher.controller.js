const Teacher = require("../models/Teacher");

exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching teachers", error: error.message });
    }
};

exports.getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) return res.status(404).json({ message: "Teacher not found" });
        res.json(teacher);
    } catch (error) {
        res.status(500).json({ message: "Error fetching teacher", error: error.message });
    }
};

exports.createTeacher = async (req, res) => {
    try {
        const { name, email, phone, subject } = req.body;

        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) return res.status(400).json({ message: "Teacher already exists" });

        const newTeacher = new Teacher({ name, email, phone, subject });
        await newTeacher.save();
        res.status(201).json(newTeacher);
    } catch (error) {
        res.status(400).json({ message: "Error creating teacher", error: error.message });
    }
};

exports.updateTeacher = async (req, res) => {
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTeacher) return res.status(404).json({ message: "Teacher not found" });
        res.json(updatedTeacher);
    } catch (error) {
        res.status(500).json({ message: "Error updating teacher", error: error.message });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
        if (!deletedTeacher) return res.status(404).json({ message: "Teacher not found" });
        res.json({ message: "Teacher deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting teacher", error: error.message });
    }
};
