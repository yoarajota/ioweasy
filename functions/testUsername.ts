const InstagramUsernameData = require("../models/instagramUsernameData");

async function testUsername(user: string) {
    return InstagramUsernameData.findOne({ user: user }).exec();
  }

export default testUsername
