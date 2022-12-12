const express = require("express");
const characterRouter = express.Router();
const {
  getCharacters,
  getCharacterById,
} = require("../controllers/characters.controllers.js");
const { createName } = require("../controllers/names.controllers.js");
const auth = require("../middleware/auth");

characterRouter.get("/", getCharacters);

characterRouter.get("/:characterId", getCharacterById);

characterRouter.post("/:characterId/name", auth, createName);

module.exports = characterRouter;
