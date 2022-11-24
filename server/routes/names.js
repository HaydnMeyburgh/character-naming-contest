const express = require("express");
const namesRouter = express.Router();

namesRouter.put("/:nameId", updateName);

namesRouter.delete("/:nameId", deleteName);
