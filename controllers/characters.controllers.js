const Character_Images = require("../models").Character_Images;
const Characters = require("../models").Characters;
const Votes = require("../models").Votes;
const NodeCache = require("node-cache");
const { Sequelize } = require("../models");

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
    const characterImage = await Character_Images.findOne({
      attributes: ["image_url", "id"],
      where: {
        id: characterId,
      },
    });
    const characterNames = await Characters.findAll({
      where: {
        ImageId: characterId,
      },
    });
    const characterNameIds = characterNames.map(
      (characterName) => characterName.id
    );
    const voteCounts = await Votes.findAll({
      attributes: [
        "nameId",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "voteCount"],
      ],
      where: {
        nameId: characterNameIds,
      },
      group: ["nameId"],
    });
    // This needs to be fixed, the vote count is not showing up
    const characterNamesWithVoteCounts = characterNames.map((characterName) => {
      const voteCount = voteCounts.find(
        (voteCount) => voteCount.nameId === characterName.id
      );
      return {
        id: characterName.id,
        name: characterName.character_names,
        voteCount: voteCount ? voteCount.voteCount : 0
        
      };
    });
    const characterInfo = {
      characterImage,
      characterNames: characterNamesWithVoteCounts,
    };
    if (!characterInfo) {
      return res.status(404).send({
        message: "That image could not be found",
      });
    }
    res.status(200).send({
      characterImage,
      characterNames: characterNamesWithVoteCounts,
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
