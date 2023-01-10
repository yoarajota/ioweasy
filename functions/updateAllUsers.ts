import getCurrentFollowers from "./getCurrentFollowers";
import getUnique from "./helpers";

const InstagramUsernameData = require("../models/instagramUsernameData");

async function updateAllUsers() {
  let query = await InstagramUsernameData.find({ requestTimes: { $gte: 3 } }).exec();

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
      let userModel = query.find((element: any) => element.username === key);
      let unfollowersList = [];
      if (userModel.followers) {
        unfollowersList = JSON.parse(userModel.followers).filter(
          (x: any) => !data[key].includes(x)
        );
      }

      InstagramUsernameData.updateOne(
        { username: key },
        {
          $set: {
            followers: JSON.stringify(getUnique(data[key])),
            lastUpdateFollowers: date,
            unfollowersList: JSON.stringify(getUnique(unfollowersList)),
            lastUpdateUnfollowers: date,
            requestTimes: 0
          }
        }, (err: any, collection: any) => {
          if (err) throw err;
        }
      );
    }
  }
}

export default updateAllUsers;
