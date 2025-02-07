const { sendEmail } = require("../services/emailService");
const Student = require("../models/Student");
const Course = require("../models/Course");

exports.sendEnrollmentEmail = async (studentId, courseId) => {
    try {
        const student = await Student.findById(studentId);
        const course = await Course.findById(courseId);

        if (!student || !course) return;

        const subject = `Bạn đã được ghi danh vào khóa học ${course.name}`;
        const text = `Xin chào ${student.name},\n\nBạn đã được ghi danh vào khóa học "${course.name}". Hãy kiểm tra lịch học và tài liệu!`;

        await sendEmail(student.email, subject, text);
    } catch (error) {
        console.error("❌ Error sending enrollment email:", error.message);
    }
};

exports.sendAnnouncementEmail = async (req, res) => {
    try {
        const { recipients, subject, message } = req.body;

        for (let email of recipients) {
            await sendEmail(email, subject, message);
        }

        res.json({ message: "Announcement emails queued successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error queuing announcement email", error: error.message });
    }
};
