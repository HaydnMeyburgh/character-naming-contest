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
  },
  apis: [
    "./models/character_images.js",
    "./models/characters.js",
    "./models/users.js",
    "./routes/*.js",
  ],
};

const specs = swagger(options);

/**
 * @swagger
 * components:
 *    securitySchemes:
 *      ApiKeyAuth:
 *        type: apiKey
 *        in: header
 *        name: authorization
 *
 */

module.exports = specs;
