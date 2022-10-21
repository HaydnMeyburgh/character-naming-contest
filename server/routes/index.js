import express from "express";
const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.status(200).send("Welcome to the character naming contest!");
});

export default indexRouter;
