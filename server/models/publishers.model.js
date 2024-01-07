const mongoose = require("mongoose");
const PublisherSchema = require("../schemas/publisher.schema")


const PublisherModel = mongoose.model("Publisher", PublisherSchema);

module.exports = PublisherModel