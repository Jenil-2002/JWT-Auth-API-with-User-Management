const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define the User model
const User = sequelize.define(
  'User', // Model name
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // tableName: 'abc', // Custom table name
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

module.exports = User;
