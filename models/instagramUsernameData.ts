const mongoose = require("mongoose");

module.exports = mongoose.model("InstagramUsernameData", {
  username: String,
  followers: Array,
  lastUpdateFollowers: Date,
  unfollowersList: Array,
  lastUpdateUnfollowers: Date,
  requestTimes: {
    type: Number, // Number type
    default: 0,
  },
  updatesLeft: {
    type: Number,
    default: 2
  }
});