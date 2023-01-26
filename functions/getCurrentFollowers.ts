import getFollowers from "../puppeteer";

async function getCurrentFollowers(users: Array<string>) {
  console.log(users)
  let a = await getFollowers(users);
  return a;
}

export default getCurrentFollowers;