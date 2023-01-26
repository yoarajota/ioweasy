import getCurrentFollowers from "./getCurrentFollowers";
import getUnique from "./helpers";

const InstagramUsernameData = require("../models/instagramUsernameData");

async function updateAllUsers() {
  let query = await InstagramUsernameData.find({ $or: [{ requestTimes: { $gte: 3 } }, { $updatesLeft: { $gt: 3 } },] });

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
      let attFollowers = null;
      if (userModel.followers) {
        if (userModel.updatesLeft !== 0) {
          let parsed = JSON.parse(userModel.followers);
          attFollowers = parsed.filter(function (element: string) {
            return data[key].includes(element);
          });

          attFollowers = attFollowers.concat(data[key].filter(function (element: string) {
            return !parsed.includes(element);
          }));
        }

        unfollowersList = (attFollowers ?? JSON.parse(userModel.followers)).filter(
          (x: any) => !data[key].includes(x)
        );

        if (attFollowers) attFollowers = getUnique(attFollowers)
      }

      let requestTimes, updatesLeft;
      if (userModel.updatesLeft !== 0) {
        requestTimes = userModel.requestTimes;
        updatesLeft = userModel.updatesLeft - 1;
      } else {
        requestTimes = 0;
        updatesLeft = 2;
      }

      InstagramUsernameData.updateOne(
        { username: key },
        {
          $set: {
            followers: JSON.stringify(attFollowers ?? getUnique(data[key])),
            lastUpdateFollowers: date,
            unfollowersList: JSON.stringify(getUnique(unfollowersList)),
            lastUpdateUnfollowers: date,
            requestTimes: requestTimes,
            updatesLeft: updatesLeft
          }
        }, (err: any, collection: any) => {
          if (err) throw err;
        }
      );
    }
  }
}

export default updateAllUsers;
