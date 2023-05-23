const Characters = require("../models").Characters;

const createName = async (req, res) => {
  const { characterId } = req.params;
  const { name } = req.body;
  try {
    //attach user id to the character name created
    const newCharacterName = await Characters.create({
      character_names: name,
      ImageId: characterId,
      UserId: req.userId,
    });
    if (!newCharacterName) {
      return res.status(404).send({
        message: "Cannot add character name",
      });
    }
    res.status(201).send({
      status: "Success",
      message: "Character name added successfully",
      character: newCharacterName,
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    });
  }
};

// Update name
const updateName = async (req, res) => {
  const { nameId } = req.params;
  const { name } = req.body;
  const findName = await Characters.findOne({
    where: {
      id: nameId,
    },
  });
  try {
    if (findName.UserId !== req.userId) {
      return res.status(401).send({
        message: "You are not authorised to udpate that name",
      });
    }
    if (name === "") {
      return res.status(400).send({
        message: "name cannot be left blank",
      });
    }
    const updateName = await Characters.update(
      {
        character_names: name,
      },
      {
        where: {
          id: nameId,
        },
      }
    );
    return res.status(200).send({
      message: "Character Name updated successfully",
      data: updateName.character_names,
    });
  } catch (err) {
    return res.status(500).send({
      meesage: err.message,
    });
  }
};

const deleteName = async (req, res) => {
  const { nameId } = req.params;
  const deleteName = await Characters.findOne({
    attributes: ["UserId"],
    where: {
      id: nameId,
    },
  });
  try {
    if (deleteName.UserId !== req.userId) {
      return res.status(403).send({
        message: "You cannot delete that name",
      });
    }
    await Characters.destroy({
      where: {
        id: nameId,
      },
    });
    return res.status(200).send({
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
  updateName,
};
