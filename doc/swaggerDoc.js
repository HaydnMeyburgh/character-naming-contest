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
      schemas: {
        User: {
          type: "object",
          required: ["firstName", "lastName", "username", "email", "password"],
          properties: {
            id : {
              type: "integer",
              description: "Auto generated id",
            },
            firstName: {
              type: "string",
              description: "First name of the user",
            },
            lastName: {
              type: "string",
              description: "Last name of the user",
            },
            username: {
              type: "string",
              description: "Username of the user",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email for the user (must be unique)",
            },
            password: {
              type: "string",
              description: "Pasword for the user",
            },
          },
          examples: {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            username: "johndoe",
            email: "johndoe@example.com",
            password: "password123",
          },
        },
        CharacterPhotos: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Auto generated id",
            },
            name: {
              type: "string",
              description: "photo reference name",
            },
            image_url: {
              type: "string",
              description: "url of character image",
            },
          },
          example: {
            id: 7,
            name: "Character 1",
            image_url: "https://google.drive//123dsdasdasda",
          },
        },
        CharacterNames: {
          type: "object",
          required: ["name"],
          properties: {
            id: {
              type: "integer",
              description: "Auto generated id",
            },
            character_names: {
              type: "string",
              description: "The character name provided by the user",
            },
            ImageId: {
              type: "integer",
              description: "The ID of the image for which the name belongs",
            },
            UserId: {
              type: "integer",
              description: "The ID of the user who posted the name"
            },
          },
          example: {
            id: 1,
            character_names: "Egor Gargorof",
            ImageId: 7,
            UserId: 2,  
          },
        },
        Vote: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Auto generated id"
            },
            userId: {
              type: "integer",
              description: "The ID of the user who cast the vote",
            },
            nameId: {
              type: "integer",
              description: "The ID of the name that was voted for",
            },
          },
          example: {
            id: 1,
            userId: 123,
            nameId: 456,
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "The error message",
            },
          },
          example: {
            message: err.message,
          },
        },
      },
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
