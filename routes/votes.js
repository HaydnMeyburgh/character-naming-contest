const express = require("express");
const voteRouter = express.Router();
const { castVote, deleteVote } = require("../controllers/votes.controllers.js");
const auth = require("../middleware/auth");

/**
 * @swagger
 * /api/vote/name/{nameId}:
 *   post:
 *     summary: Cast a vote
 *     tags:
 *       - vote
 *     parameters:
 *       - in: path
 *         name: nameId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the name to vote for
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Vote successfully casted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vote'
 *       400:
 *         description: Invalid request parameters
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *       403:
 *         description: Cannot vote for the same comment more than once
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * */
voteRouter.post("/name/:nameId/", auth, castVote);

/**
 * @swagger
 * /api/vote/{voteId}:
 *   delete:
 *     summary: Remove a vote
 *     tags:
 *       - vote
 *     parameters:
 *       - in: path
 *         name: voteId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the vote to remove
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vote successfully removed
 *       403:
 *         description: You do not have permission to remove that vote
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
voteRouter.delete("/:voteId", auth, deleteVote);

module.exports = voteRouter;
