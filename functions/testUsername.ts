const InstagramUsernameData = require("../models/instagramUsernameData");

async function testUsername(user: string) {
    return InstagramUsernameData.findOne({ username: user }).exec();
  }

export default testUsername
