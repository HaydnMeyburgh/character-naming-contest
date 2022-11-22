import express from "express";
const app = express();

import * as dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
app.use(bodyParser.json());

import morgan from "morgan";
app.use(morgan("dev"));

import characterRouter from "./server/routes/characters";
app.use("/api/characters", characterRouter);

import namesRouter from "./server/routes/names";
app.use("/api/names", namesRouter);

app.get("/", (req, res) => {
  try {
    res
      .status(200)
      .send(
        "Welcome to the Character Naming Competition! Let the best name win!"
      );
  } catch (e) {
    res.status(500).send(e);
  }
});

const PORT = process.env.DEV_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
