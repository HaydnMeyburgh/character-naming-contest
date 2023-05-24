const swagger = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Character Naming Contest",
      version: "1.0.0",
      description:
        "A backend API where users can login and add/delete (Only when authorised) names associated to character photos.",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          in: "cookie", //Specifying that the token is sent via a cookie
          name: "auth_cookie",
        },
      },
    },
    security: [
      {
        bearerAuth: [], //Using the defined  security scheme for all endpoints.
      },
    ],
  },
  apis: [
    "./models/character_images.js",
    "./models/characters.js",
    "./models/users.js",
    "./routes/*.js",
  ],
};

const specs = swagger(options);

module.exports = specs;
