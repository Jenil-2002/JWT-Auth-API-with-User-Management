// src/scripts/generateFakeData.js
const faker = require('faker');
// const sequelize = require('../config/config.json'); // Adjust the path as needed
const sequelize = require('./src/config/config.json'); // Adjust the path as needed
const User = require('./src/models/user'); // Adjust the path as needed
const bcrypt = require('bcryptjs');

const generateFakeUsers = async (numUsers) => {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    users.push({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('password123', 10),
    });
  }

  try {
    await User.bulkCreate(users);
    console.log(`${numUsers} users have been added to the database.`);
  } catch (error) {
    console.error('Error inserting fake data:', error);
  }
};

const main = async () => {
  // await sequelize.sync(); // Make sure tables are created
  await generateFakeUsers(500); // Adjust the number of users you want to generate
};

main();
