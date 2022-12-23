const express = require("express");
const usersRouter = express.Router();
const {
  loginUser,
  logoutUser,
  signUp,
} = require("../controllers/users.controllers");
const verifySignup = require("../middleware/verifySignUp");

usersRouter.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});
/**
 * @swagger
 * tags:
 *  - name: user
 *    description: user API
 *  - name: names
 *    description: The character photo names API
 *  - name: character photos
 *    description: The character photos API
 * */

/**
 * @swagger
 * /api/auth/signup:
 *    post:
 *      summary: Creates a new user
 *      produces:
 *        - application/json
 *      tags:
 *        - user
 *      requestBody:
 *        description: required data for new user
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: User verified and registered successfully
 *        "400":
 *          description: Email is already in use or Email and/or username is blank
 *        "500":
 *          description: Server Error
 *          schema:
 *            $ref: '#/components/schemas/User'
 */
usersRouter.post("/signup", verifySignup, signUp);

/**
 * @swagger
 * /api/auth/login:
 *    post:
 *      summary: Logs in a user
 *      produces:
 *        - application/json
 *      tags:
 *        - user
 *      requestBody:
 *        description: required data to login
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  example: Test user
 *                email:
 *                   type: string
 *                   example: testuser@test.com
 *                password:
 *                   type: string
 *                   example: pole1232
 *      responses:
 *        "200":
 *          description: User successfully logged in and JWT token created
 *        "400":
 *          description: Incorrect password
 *        "404":
 *          description: "User not found"
 *        "500":
 *          description: "Server error"
 *          schema:
 *            $ref: '#/components/schemas/User'
 */
usersRouter.post("/login", loginUser);

/**
 * @swagger
 * /api/auth/logout:
 *    post:
 *      summary: Logs out a user
 *      produces:
 *        - application/json
 *      tags:
 *        - user
 *      responses:
 *        "200":
 *          description: User successfully logged out
 *          schema:
 *            $ref: '#/components/schemas/User'
 */
usersRouter.post("/logout", logoutUser);

module.exports = usersRouter;
