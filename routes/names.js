const express = require("express");
const namesRouter = express.Router();
const { deleteName, updateName } = require("../controllers/names.controllers");
const auth = require("../middleware/auth");

/**
 * @swagger
 * /api/name/{nameId}:
 *    put:
 *      summary: Updates a name when a user is authorised
 *      tags:
 *        - names
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: required data for updated name
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Character Name'
 *      parameters:
 *      - in: path
 *        name: nameId
 *        schema:
 *          type: integer
 *        required: true
 *        description: The name id
 *      responses:
 *        "200":
 *          description: Updated Character Name
 *        "400":
 *          description: Name cannot be blank
 *        "401":
 *          description: Unauthorised, cannot update that name
 *        "500":
 *          description: Server Error
 *          schema:
 *            $ref: '#/components/schemas/Character Name'
 */
namesRouter.put("/:nameId", auth, updateName);

/**
 * @swagger
 * /api/name/{nameId}:
 *    delete:
 *      summary: Deletes a name when a user is authorised
 *      tags:
 *        - names
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - in: path
 *        name: nameId
 *        schema:
 *          type: integer
 *        required: true
 *        description: The name id
 *      responses:
 *        "200":
 *          description: Deleted character name
 *        "401":
 *          description: Unauthorised, cannot delete that name
 *        "500":
 *          description: Server Error
 *          schema:
 *            $ref: '#/components/schemas/Character Name'
 */
namesRouter.delete("/:nameId", auth, deleteName);

module.exports = namesRouter;
