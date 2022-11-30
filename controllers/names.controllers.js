const Characters = require("../models").Characters;

const createName = async (req, res) => {
  const { characterId } = req.params;
  const { name } = req.body;
  try {
    const newCharacterName = await Characters.create({
      character_names: name,
      ImageId: characterId,
      userId: 1,
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

const updateName = async (req, res) => {
  const { nameId } = req.params;
  const { name } = req.body;
  try {
    const updatedCharacterName = await Characters.update(
      { character_names: name },
      {
        where: {
          id: nameId,
        },
      }
    );
    if (!updatedCharacterName) {
      return res.status(404).send({
        message: "Character name change could not be updated",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Successfully updated your character name",
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

const deleteName = async (req, res) => {
  const { nameId } = req.params;
  try {
    const deletedName = await Characters.destroy({
      where: {
        id: nameId,
      },
    });
    if (!deletedName) {
      return res.status(404).send({
        message: "Character name could not be deleted",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "Deleted character name",
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};

module.exports = {
  updateName,
  deleteName,
  createName,
};
