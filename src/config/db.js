const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql", // The database dialect (mysql, postgres, etc.)
  }
);

module.exports = sequelize;
