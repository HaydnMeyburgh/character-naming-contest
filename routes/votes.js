const express = require("express");
const voteRouter = express.Router();
const { castVote, deleteVote } = require("../controllers/votes.controllers.js");
const auth = require("../middleware/auth");

// Post a vote to the vote database
voteRouter.post("name/:nameId/", auth, castVote);

// Remove a vote
voteRouter.delete("/:voteId", auth, deleteVote);

module.exports = voteRouter;
