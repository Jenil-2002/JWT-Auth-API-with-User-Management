const User = require("../models/user");

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
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
}