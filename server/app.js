import logger from "morgan";
import express from "express";
import bodyParser from "body-parser";
import indexRouter from "./routes/index.js";

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/v1", indexRouter);

export default app;
