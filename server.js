const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const { swaggerUi, swaggerSpec } = require('./src/swagger/swagger');
const appConfig = require('./src/config/config');

dotenv.config();

const app = express();

const { HOST, PORT } = appConfig;

// Serve Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes)

app.listen(PORT, HOST,() => {
    console.log(`Server running at http://${HOST}:${PORT}`);
    console.log(`Swagger running at http://${HOST}:${PORT}/api-docs`);
  });
