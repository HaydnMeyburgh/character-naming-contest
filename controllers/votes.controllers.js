const Votes = require("../models").Votes;

const castVote = async (req, res) => {
  const { nameId } = req.params;
  const { userId } = req;
  try {
    const Voted = await Votes.findOne({
      where: {
        userId: userId,
        nameId: nameId,
      },
    });
    if (Voted) {
      return res.status(403).send({
        message: "You cannot Vote for the same comment more then once",
      });
    }
    const newVote = await Votes.create({
      userId: userId,
      nameId: nameId,
    });
    if (!newVote) {
      return res.status(400).send({
        message: "Invalid request parameters",
      });
    }
    res.status(201).send({
      status: "Success",
      message: "Vote casted",
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

const deleteVote = async (req, res) => {
  const { voteId } = req.params;
  const { userId } = req;
  const deleteVote = await Votes.findOne({
    attributes: ["userId"],
    where: {
      id: voteId,
    },
  });
  try {
    if (deleteVote.userId !== userId) {
      return res.status(403).send({
        message: "You do not have the permission to remove that vote.",
      });
    }
    await Votes.destroy({
      where: {
        id: voteId,
      },
    });
    res.status(200).send({
      message: "Removed vote",
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};

module.exports = {
  castVote,
  deleteVote,
};
