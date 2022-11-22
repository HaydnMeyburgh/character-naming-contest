import express from "express";
const namesRouter = express.Router();

namesRouter.put("/:characterId/name/:nameId", updateName);

namesRouter.delete("/:characterId/name/:nameId", deleteName);
