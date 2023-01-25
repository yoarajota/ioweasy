"use strict";
const mongoose = require("mongoose");
module.exports = mongoose.model("InstagramUsernameData", {
    username: String,
    followers: JSON,
    lastUpdateFollowers: Date,
    unfollowersList: JSON,
    lastUpdateUnfollowers: Date,
    requestTimes: {
        type: Number,
        default: 0,
    },
    updatesLeft: {
        type: Number,
        default: 2
    }
});
