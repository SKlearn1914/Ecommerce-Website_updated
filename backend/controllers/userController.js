const User = require("../models/User");

// GET ALL USERS
exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

// DELETE USER
exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
};

// TOGGLE ROLE (user <-> admin)
exports.toggleRole = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = user.role === "admin" ? "user" : "admin";

    await user.save();
    res.json(user);
};

// UPDATE USER (optional but PRO)
exports.updateUser = async (req, res) => {
    const updated = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updated);
};