import auth from "./auth";
import launch from "./launch";
import passThroughAndGet from "./passThroughAndGet";

require("dotenv").config();

async function getFollowers(users: Array<string>) {
  let response: any = {};
  let tryes = 5;

  async function work() {
    try {
      const browser = await launch();

      const page = await browser.newPage();

      await auth(page);

      await page.waitForSelector(
        "div > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div > div.x78zum5.xdt5ytf.x10cihs4.x1t2pt76.x1n2onr6.x1ja2u2z > div.x9f619.xnz67gz.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1qughib > div.xh8yej3.x1gryazu.x10o80wk.x14k21rp.x1porb0y.x17snn68.x6osk4m > section > main > div"
      );

      const page2 = await browser.newPage();

      for (let user of users) {
        if (response[user] !== undefined) continue;

        response = await passThroughAndGet('followers', response, page2, user)
      }
      
      console.log('close?')
      await browser.close();
      return { status: "success", data: response };
    } catch (error) {
      console.log(error)

      if (tryes !== 0) {
        tryes--;
        work();
      } else if (tryes === 0) {
        return { status: "error", data: [] };
      }
    }
  }
  return await work();
}

export default getFollowers;
