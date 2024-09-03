const sequelize = require('./src/config/db');
const bcrypt = require('bcryptjs');
const User = require('./src/models/user'); // Import the model(s)

// Sync all defined models to the DB
sequelize.sync({ force: true }) // `force: true` will drop the table if it already exists
  .then(async() => {
    console.log('Database & tables created!');

    const hashedPassword = bcrypt.hashSync('password123', 8);
    // Add a sample user record
    const sampleUser = await User.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: hashedPassword // In a real app, never store plain text passwords
    });
    console.log('Sample user created:', sampleUser.toJSON());

  })
  .catch(error => console.error('Error creating database:', error))
  .finally(() => {
    sequelize.close(); // Close the connection after syncing
  });
