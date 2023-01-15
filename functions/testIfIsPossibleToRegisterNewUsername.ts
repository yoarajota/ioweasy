const InstagramUsernameData = require("../models/instagramUsernameData");

async function testIfIsPossibleToRegisterNewUsername() {
  return await InstagramUsernameData.count() <= 10;
}

export default testIfIsPossibleToRegisterNewUsername;