import express from "express";

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.status(200).send("Hello can you hear me?");
});

export default indexRouter;
