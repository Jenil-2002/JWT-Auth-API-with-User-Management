'use strict';

const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];

    for (let i = 0; i < 5; i++) {  // Change 500 to the number of records you want to generate
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('password123', 8),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
