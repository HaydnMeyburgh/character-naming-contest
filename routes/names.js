const express = require("express");
const namesRouter = express.Router();
const { updateName, deleteName } = require("../controllers/names.controllers");

namesRouter.put("/:nameId", updateName);

namesRouter.delete("/:nameId", deleteName);

module.exports = namesRouter;
