const Student = require("../models/student");
const redisClient = require("../config/redisConfig");

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();

        await redisClient.set(req.originalUrl, JSON.stringify(students), { EX: 600 });

        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students", error: error.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        await redisClient.set(req.originalUrl, JSON.stringify(student), { EX: 600 });

        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Error fetching student", error: error.message });
    }
};

exports.createStudent = async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();

        await redisClient.del("/api/students");

        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: "Error creating student", error: error.message });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) return res.status(404).json({ message: "Student not found" });

        await redisClient.del(`/api/students/${req.params.id}`); 
        await redisClient.del("/api/students");

        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: "Error updating student", error: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) return res.status(404).json({ message: "Student not found" });

        await redisClient.del(`/api/students/${req.params.id}`);
        await redisClient.del("/api/students");

        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting student", error: error.message });
    }
};
