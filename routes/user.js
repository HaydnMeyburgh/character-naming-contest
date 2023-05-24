const express = require("express");
const usersRouter = express.Router();
const {
  loginUser,
  logoutUser,
  signUp,
  updateUser,
} = require("../controllers/users.controllers");
const verifySignup = require("../middleware/verifySignUp");
const auth = require("../middleware/auth");

usersRouter.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});
/**
 * @swagger
 * tags:
 *  - name: user
 *    description: user API
 *  - name: character names
 *    description: The character photo names API
 *  - name: character photos
 *    description: The character photos API
 *  - name: vote
 *    description: The vote api
 * */

/**
 * @swagger
 * /api/auth/signup:
 *    post:
 *      summary: Creates a new user
 *      tags:
 *        - user
 *      requestBody:
 *        description: required data for new user registration
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: User registered successfully
 *        "400":
 *          description: Email is already in use or Email and/or username is blank
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        "500":
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
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
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        "404":
 *          description: "User not found"
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        "500":
 *          description: "Server error"
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
usersRouter.post("/login", loginUser);

/**
 * @swagger
 * /api/auth/logout:
 *    post:
 *      summary: Logs out a user
 *      tags:
 *        - user
 *      responses:
 *        "200":
 *          description: User successfully logged out
 *        "500":
 *          description: "Server error"
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
usersRouter.post("/logout", logoutUser);

/**
 * @swagger
 * /api/auth/user:
 *  put:
 *    summary: Update a user
 *    tags:
 *      - user:
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      description: User data to update
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *       "200":
 *         description: User updated successfully
 *       "400":
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "403":
 *         description: Access forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       "500":
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 */
usersRouter.put("/user", auth, updateUser);

module.exports = usersRouter;
