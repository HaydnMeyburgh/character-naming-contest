const Character_Images = require("../models").Character_Images;
const Characters = require("../models").Characters;
const NodeCache = require("node-cache");

const myCache = new NodeCache({
  stdTTL: 300,
});

const getCharacters = async (req, res) => {
  if (myCache.has("char_images")) {
    res.status(200).send({ images: myCache.get("char_images") });
  } else {
    try {
      const allCharacterImages = await Character_Images.findAll({
        attributes: ["image_url", "id"],
      });
      if (!allCharacterImages) {
        return res.status(404).send({
          message: "Images could not be retrieved",
        });
      }
      myCache.set("char_images", allCharacterImages);
      res.status(200).send({
        images: allCharacterImages,
      });
    } catch (err) {
      res.status(500).send({
        error: err.message,
      });
    }
  }
};

// Returns the character image and the corresponding user names posted for that image.
const getCharacterById = async (req, res) => {
  const { characterId } = req.params;
  try {
    const characterImage = await Character_Images.findAll({
      attributes: ["image_url", "id"],
      where: {
        id: characterId,
      },
    });
    const allCharacterNames = await Characters.findAll({
      attributes: ["character_names"],
      where: {
        ImageId: characterId,
      },
    });
    if (!(characterImage || allCharacterNames)) {
      return res.status(404).send({
        message: "That image could not be found",
      });
    }
    res.status(200).send({
      image: characterImage,
      names: allCharacterNames,
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};

module.exports = {
  getCharacters,
  getCharacterById,
};
