const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cookieParser = require("cookie-parser");
const winston = require("winston");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const logger = require("./services/logger_service");
const exHbs = require("express-handlebars");
const viewRouter = require("./routes/view.routes");

const PORT = config.get("port");
const mainRoute = require("./routes/index.routes");
const error_handling_middleware = require("./middleware/error_handling_middleware");

const app = express();
app.use(express.json());
app.use(cookieParser());

const hbs = exHbs.create({
  defaultLayout: "main",
  extname: "hbs",
});
app.engine("hbs", hbs.engine);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static("views"));

// app.use(expressWinstonLogger);

app.use("/", viewRouter); // frontend
app.use("/api", mainRoute); // backend

// app.use(expressWinstonErrorLogger);

app.use(error_handling_middleware); // error handling eng oxirida bolish kere

async function start() {
  try {
    await mongoose.connect(config.get("dbAtlasUri"));
    app.listen(PORT, () => {
      console.log(`Server started at: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
