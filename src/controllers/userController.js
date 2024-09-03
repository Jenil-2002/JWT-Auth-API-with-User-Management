const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");


exports.userList = (req, res) => {
  const offset = parseInt(req.query.offset) || 0; // Default offset to 0
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10
  User.findAll({
    limit: limit,
    offset: offset,
  })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return res.status(500).json({ message: "Error fetching users:", err });
    });
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the route parameter
    const user = await User.findByPk(userId); // Fetch the user using Sequelize

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Return the user details as JSON
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.decode(token);
  try {
    const userId = req.params.id; // Get the user ID from the route parameter
    if (userId == decoded.id) {
      return res.json({ message: "Logged in user cannot delete" })
    }
    // Find the user by ID and delete
    const user = await User.destroy({ where: { id: userId } });

    if (user) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.params.id;
    const { email, name, password } = req.body;

    // Find the user in the database
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user information
    if (email) user.email = email;
    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 10); // Hash the password before saving

    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};