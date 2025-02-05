const jwt = require("jsonwebtoken");
const redisClient = require("../config/redisConfig");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Access denied" });

        const revokedToken = await redisClient.get(`blacklist:${token}`);
        if (revokedToken) return res.status(401).json({ message: "Token revoked, please login again" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const cachedUser = await redisClient.get(`user:${decoded.id}`);
        if (cachedUser) {
            req.userInfo = JSON.parse(cachedUser);
        } else {
            const user = await User.findById(decoded.id).select("-password");
            if (!user) return res.status(404).json({ message: "User not found" });

            req.userInfo = user;
            await redisClient.set(`user:${decoded.id}`, JSON.stringify(user), { EX: 600 });
        }

        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token", error: error.message });
    }
};

const roleMiddleware = (roles) => (req, res, next) => {
    if (!roles.includes(req.userInfo.role)) {
        return res.status(403).json({ message: "Permission denied" });
    }
    next();
};

module.exports = { authMiddleware, roleMiddleware };
