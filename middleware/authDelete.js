const Characters = require("../models").Characters;

const authoriseDelete = async (req, res, next) => {
  const { userId } = req.userId;
  const { nameId } = req.body;
  try {
    const nameDelete = await Characters.findOne({
      where: {
        userId: userId,
        nameId: nameId,
      },
    });
    if (!nameDelete) {
      return res.status(401).send({
        message: "Cannot delete name that is not associated with you",
      });
    }
    next();
  } catch (err) {
    return res.status(500).send({
      message: "Unable to validate user",
    });
  }
};

module.exports = authoriseDelete;
