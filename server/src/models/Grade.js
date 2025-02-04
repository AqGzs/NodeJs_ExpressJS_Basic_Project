const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    score: { type: Number, required: true, min: 0, max: 10 },
    grade: { type: String },
    createdAt: { type: Date, default: Date.now }
});

gradeSchema.pre("save", function (next) {
    if (this.score >= 9) this.grade = "A";
    else if (this.score >= 8) this.grade = "B";
    else if (this.score >= 6.5) this.grade = "C";
    else if (this.score >= 5) this.grade = "D";
    else this.grade = "F";
    next();
});

module.exports = mongoose.model("Grade", gradeSchema);
