const mongoose = require("mongoose");

const InstagramUsernameData = mongoose.model('InstagramUsernameData', {
    username: String,
    followers: JSON,
    lastUpdateFollowers: Date,
    unfollowersList: JSON,
    lastUpdateUnfollowers: Date,
})

export default InstagramUsernameData