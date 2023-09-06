const express = require("express");
const characterRouter = express.Router();
const {
  getCharacters,
  getCharacterById,
} = require("../controllers/characters.controllers.js");
const { createName } = require("../controllers/names.controllers.js");
const auth = require("../middleware/auth");

/**
 * @swagger
 * /api/characters/:
 *    get:
 *      summary: Get all character images
 *      tags:
 *        - character photos
 *      responses:
 *        "200":
 *          description: returns all photos
 *        "404":
 *          description: Images could not be retrieved
 *        "500":
 *          description: server error
 */
characterRouter.get("/", getCharacters);

/**
 * @swagger
 * /api/characters/{characterId}:
 *    get:
 *      summary: Get character image with all names by id
 *      tags:
 *        - character photos
 *      parameters:
 *        - in: path
 *          name: characterId
 *          schema:
 *            type: integer
 *          required: true
 *          description: The character photo id
 *      responses:
 *        "200":
 *          description: returns character image and all names
 *        "404":
 *          description: The image could not be found
 *        "500":
 *          description: Internal server error
 */
characterRouter.get("/:characterId", getCharacterById);

/**
 * @swagger
 * /api/characters/{characterId}/name:
 *    post:
 *      summary: Posts a name to a character photo if authorised
 *      tags:
 *        - character photos
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: required data for creating name
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Character Name'
 *      parameters:
 *      - in: path
 *        name: characterId
 *        schema:
 *          type: integer
 *        required: true
 *        description: The character photo id
 *      responses:
 *        "200":
 *          description: Created Character Name
 *        "404":
 *          description: Cannot add character name
 *        "500":
 *          description: Server Error
 */
characterRouter.post("/:characterId/name", auth, createName);

module.exports = characterRouter;
