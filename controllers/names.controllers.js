const Characters = require("../models").Characters;

const createName = async (req, res) => {
  const { characterId } = req.params;
  const { name } = req.body;
  const { userId } = req.userId;
  try {
    //attach user id to the character name created
    const newCharacterName = await Characters.create({
      character_names: name,
      ImageId: characterId,
      userId: userId,
    });
    if (!newCharacterName) {
      return res.status(404).send({
        message: "Cannot add character name",
      });
    }
    res.status(201).send({
      status: "Success",
      message: "Character name added successfully",
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};
// Need to implement authorization for deletion of character name
const deleteName = async (req, res) => {
  const { nameId } = req.params;
  try {
    await Characters.destroy({
      where: {
        id: nameId,
      },
    });
    res.status(200).send({
      message: "Deleted character name",
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};

module.exports = {
  deleteName,
  createName,
};
