const logger = require("morgan");
const express = require("express");
const indexRouter = require("./routes/index.js");
const bodyParser = require("body-parser");

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/v1", indexRouter);

module.exports = app;
