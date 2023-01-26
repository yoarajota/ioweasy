const InstagramUsernameData = require("../models/instagramUsernameData");

async function userModel(user: string) {
    return InstagramUsernameData.findOne({ username: user }).exec();
  }

export default userModel
