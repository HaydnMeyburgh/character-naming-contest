const express = require("express");
const app = express();
const env = require("dotenv").config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cookieSession = require("cookie-session");
const characterRouter = require("./routes/characters");
const namesRouter = require("./routes/names");
const PORT = process.env.PROD_PORT || 3000;
const usersRouter = require("./routes/user");
const swaggerUI = require("swagger-ui-express");
const specs = require("./doc/swaggerDoc");

app.use(bodyParser.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "character-name-session",
    secret: process.env.COOKIESECRET,
    httpOnly: true,
  })
);

app.use(morgan("dev"));

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/api/characters", characterRouter);

app.use("/api/name", namesRouter);

app.use("/api/auth", usersRouter);

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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
