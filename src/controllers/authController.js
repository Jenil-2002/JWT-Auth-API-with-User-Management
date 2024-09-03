const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  // console.log(req.body)

  User.findOne({ where: { email } }).then((results) => {
    if (results) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    User.create({ name, email, password: hashedPassword })
      .then((result) => {
        return res
          .status(201)
          .json({ message: "User registered successfully", user: result });
      })
      .catch((err) => {
        return res.status(500).json({ message: "Database error", err });
      });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } }).then((results) => {
    if (results === null) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results;
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.json({ accessToken, message: "Logged in successfully" });
  });
};

exports.logOut = (req, res) => {
  try {
    // const token = req.header("Authorization").replace("Bearer ", "");
    // token.destroy();
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "An error occurred during logout",
        error: error.message,
      });
  }
};

exports.refreshToken = (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.decode(token);

  const refreshToken = jwt.sign(
    { id: decoded.id, email: decoded.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return res.json({ refreshToken });
};
