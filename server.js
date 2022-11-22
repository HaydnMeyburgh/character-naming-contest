const express = require("express");
const app = express();

require(dotenv.config());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const morgan = require("morgan");
app.use(morgan("dev"));

const characterRouter = require("./server/routes/characters");
app.use("/api/characters", characterRouter);

const namesRouter = require("./server/routes/names");
app.use("/api/name", namesRouter);

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
