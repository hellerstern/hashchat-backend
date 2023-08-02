const mongoose = require("mongoose");
//to create the models
let Schema = mongoose.Schema;

let reviewSchema = new Schema({
  fromid: {
    type: String,
  },
  toid: {
    type: String,
  },
  content: {
    type: String,
  },
  ischecked : {
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Review", reviewSchema);
