import getCurrentFollowers from "./getCurrentFollowers";

const InstagramUsernameData = require("../models/instagramUsernameData");

async function updateAllUsers() {
  let query = await InstagramUsernameData.find();

  let allUsers: Array<string> = [];
  for (const u of query) {
    allUsers.push(u.username);
  }
  let a = await getCurrentFollowers(allUsers);
  if (!a) return;
  const { status, data } = a;

  if (status === "success") {
    let date = new Date();
    for (const key in data) {
      // ENCONTRAR DENTRO DE QUERY O USERNAME CERTO
      let userModel = query.find((element: any) => element.username === key);
      let unfollowersList = userModel.followers.filter(
        (x: any) => !data[key].includes(x)
      );

      InstagramUsernameData.updateOne(
        { name: key },
        {
          followers: data[key],
          lastUpdateFollowers: date,
          unfollowersList: unfollowersList,
          lastUpdateUnfollowers: date,
        }
      );
    }
  }
}

export default updateAllUsers;
