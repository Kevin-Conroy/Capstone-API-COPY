require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const profileRouter = require("./profile-router");
const restaurantRouter = require("./restaurant-router")
const knex = require('knex')
const ProfilesService = require("./profiles-service")
const app = express();
const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(profileRouter);
app.use(express.json());

console.log('knex and driver installed correctly');
console.log(process.env.DATABASE_URL)

app.get("/", (req, res) => {
  res.status(200).send("Here is the welcome page");
});







app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
