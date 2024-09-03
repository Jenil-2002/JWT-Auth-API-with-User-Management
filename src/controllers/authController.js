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
    // const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    // console.log(decoded)

    return res.json({ accessToken, message: "Logged in successfully" });
  });
};

exports.refreshToken = (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const refreshToken = jwt.sign(
    { id: decoded.id, email: decoded.email },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
  return res.json({ refreshToken });
};
