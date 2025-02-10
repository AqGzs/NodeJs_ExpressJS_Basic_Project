const Course = require("../models/Course");
const Student = require("../models/student");
const { queueEmail } = require("../services/emailService");
const { sendNotification } = require("../config/websocket");
const redisClient = require("../config/redisConfig");

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("teacher", "username email").populate("students", "name email");
        await redisClient.set(req.originalUrl, JSON.stringify(courses), { EX: 600 });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching courses", error: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate("teacher", "username email").populate("students", "name email");
        if (!course) return res.status(404).json({ message: "Course not found" });
        await redisClient.set(req.originalUrl, JSON.stringify(course), { EX: 600 });
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: "Error fetching course", error: error.message });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const { name, description, teacher } = req.body;
        const newCourse = new Course({ name, description, teacher });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({ message: "Error creating course", error: error.message });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) return res.status(404).json({ message: "Course not found" });
        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: "Error updating course", error: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) return res.status(404).json({ message: "Course not found" });
        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting course", error: error.message });
    }
};
exports.invalidateCourseCache = async () => {
    await redisClient.del("/api/courses");
};

exports.enrollStudent = async (req, res) => {
    try {
        const { studentId } = req.body;
        const { courseId } = req.params;

        const student = await Student.findById(studentId);
        const course = await Course.findById(courseId);

        if (!student || !course) {
            return res.status(404).json({ message: "Student or course not found" });
        }

        if (course.students.includes(studentId)) {
            return res.status(400).json({ message: "Student already enrolled in this course" });
        }
        course.students.push(studentId);
        await course.save();

        await queueEmail(student.email, "Bạn đã ghi danh thành công", `Bạn đã được ghi danh vào khóa học ${course.name}.`);

        sendNotification(studentId, `Bạn đã được ghi danh vào khóa học ${course.name}.`);

        res.status(200).json({ message: "Student enrolled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error enrolling student", error: error.message });
    }
};
