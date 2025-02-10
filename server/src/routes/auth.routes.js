const express = require("express");
const { register, login , logout} = require("../controllers/auth.controller");
const { updateUserRole } = require("../controllers/auth.controller");
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.put("/:id/role", authMiddleware, roleMiddleware(["admin"]), updateUserRole);

module.exports = router;
