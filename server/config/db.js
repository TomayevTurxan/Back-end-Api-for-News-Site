const mongoose = require('mongoose');
require("dotenv").config();

mongoose
  .connect(
    process.env.DB_CONNECTION_KEY.replace("<password>", process.env.DB_PASSWORD)
  )
  .then(() => console.log("Connected to Mongo DB!"));