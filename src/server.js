const express = require("express");
const morgan = require("morgan");
const profileRouter = require("./profile-router");
const restaurantRouter = require("./restaurant-router");
const knex = require("knex");
const app = require("./app");
const { PORT, DATABASE_URL } = require('./config');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
})

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
})

app.set('db', db)

const morganSetting = process.env.NODE_ENV === "production" ? "tiny" : "common";
app.use(morgan(morganSetting));
app.use(profileRouter);
app.use(restaurantRouter)

app.use((error, req, res, next) => {
  let response;
  if (process.env.NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { error };
  }
  res.status(500).json(response);
});

//const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = { app };