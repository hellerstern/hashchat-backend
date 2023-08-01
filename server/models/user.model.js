const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//to create the models
let Schema = mongoose.Schema;

let userSchema = new Schema({
  nftid: {
    type: String,
  },
  isusing: {
    type: Boolean,
  },
});

module.exports = mongoose.model("User", userSchema);
