import InstagramUsernameData from "../models/instagramUsernameData";
import { getFollowers } from "../puppeteer/puppeteer";
import getCurrentFollowers from "./getCurrentFollowers";

export default async function updateAllUsers() {
    let query = await InstagramUsernameData.find();

    let allUsers: Array<string> = []
    for (const u of query) {
        allUsers.push(u.username)
    }

    const { status, followersListOfUsers } = await getCurrentFollowers(allUsers);

    if (status === 'success') {
        let date = new Date;
        for (const key in followersListOfUsers) {
            let unfollowersList = query.filter(x => !followersListOfUsers[key].includes(x));

            InstagramUsernameData.updateOne({ name: key }, {
                followers: followersListOfUsers[key],
                lastUpdateFollowers: date,
                unfollowersList: unfollowersList,
                lastUpdateUnfollowers: date,
            });
        }
    }

}

module.exports = { updateAllUsers }