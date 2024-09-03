const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const appConfig = require('../config/config');

const { HOST, PORT } = appConfig;

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Test API using Swagger',
  },
  servers: [
    {
      url: `http://${HOST}:${PORT}`,
      description: 'Local server',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

// Options for the Swagger docs
const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: ['./src/routes/*.js'], // Adjust this path to where your API routes are
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
