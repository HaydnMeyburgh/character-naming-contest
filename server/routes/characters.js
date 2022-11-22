import express from "express";
const characterRouter = express.Router();
import {
  getAllCharacters,
  getCharacterById,
} from "../controllers/characters.controllers.js";

characterRouter.get("/", getAllCharacters);

characterRouter.get("/:characterId", getCharacterById);

characterRouter.post("/:characterId/name", createName);
