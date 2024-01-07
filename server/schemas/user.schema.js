const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  imgUrl: String,
  email: String,
  password: String,
});

module.exports = UsersSchema;
