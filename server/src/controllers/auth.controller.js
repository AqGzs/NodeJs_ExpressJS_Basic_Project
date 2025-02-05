const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const redisClient = require("../config/redisConfig");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const newUser = new User({ username, email, password, role: "student" });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully. Default role is student." });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        await redisClient.set(`user:${user._id}`, JSON.stringify(user), { EX: 600 });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

exports.updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;

        if (!["admin", "teacher", "student"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        await redisClient.del(`user:${userId}`);
        res.json({ message: "User role updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user role", error: error.message });
    }
};
exports.logout = async (req, res) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (token) {
            await redisClient.set(`blacklist:${token}`, "revoked", { EX: 3600 });
        }
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out", error: error.message });
    }
};
