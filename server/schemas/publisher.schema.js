const mongoose = require('mongoose');

const PublisherSchema = new mongoose.Schema({
  publisherName: String,
  fullName: String,
  email: String,
  password: String,
  isVerify: Boolean,
  file: Object,
});

module.exports = PublisherSchema;
