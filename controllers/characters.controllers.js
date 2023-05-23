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
/*
*
*
*
  TODO: I need to cache the response from this controller function as the initial load time is quite long
*
*
*
*
  */
const getCharacterById = async (req, res) => {
  const { characterId } = req.params;
  try {
    // fetching Character Image
    const characterImage = await Character_Images.findOne({
      attributes: ["image_url", "id"],
      where: {
        id: characterId,
      },
    });
    // fetching character names for Image
    const characterNames = await Characters.findAll({
      where: {
        ImageId: characterId,
      },
    });
    // createing new array of just character ids
    const characterNameIds = characterNames.map(
      (characterName) => characterName.id
    );
    //Fetching a count of the number of rows where nameId is the same as a character id from the array above
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
    // grouping character names with their vote count into an array of objects
    const characterNamesWithVoteCounts = characterNames.map((characterName) => {
      const voteCount = voteCounts.find(
        (voteCount) => voteCount.nameId === characterName.id
      );
      return {
        id: characterName.id,
        name: characterName.character_names,
        // Using sequelize .get() method to get the actual value of the "voteCount" attribute 
        voteCount: voteCount ? voteCount.get("voteCount") : 0,
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
