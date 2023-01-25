import auth from "../auth";
import launch from "../launch";

require("dotenv").config();

const query = () => {
  let b = document.getElementsByClassName(
    "_ab8w  _ab94 _ab97 _ab9f _ab9k _ab9p  _ab9- _aba8 _abcm"
  );
  let arr = [];
  for (let x of b) {
    arr.push(
      x.children[1]?.firstChild?.firstChild?.firstChild?.firstChild?.firstChild
        ?.firstChild?.firstChild?.firstChild?.data ??
      x.children[1]?.firstChild?.firstChild?.firstChild?.firstChild
        ?.firstChild?.firstChild?.firstChild?.data
    );
  }
  return arr;
};

async function debug() {
  let tryes = 5;

  async function work() {
    const browser = await launch();

    const page = await browser.newPage();

    await auth(page);

    await page.waitForSelector(
      "div > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div > div.x78zum5.xdt5ytf.x10cihs4.x1t2pt76.x1n2onr6.x1ja2u2z > div.x9f619.xnz67gz.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1qughib > div.xh8yej3.x1gryazu.x10o80wk.x14k21rp.x1porb0y.x17snn68.x6osk4m > section > main > div"
    );

    const page2 = await browser.newPage();


    await page2.goto(`https://www.instagram.com/nekr0zi`);

    await page2.waitForSelector(
      "section > main > div > ul > li > a > div > span > span"
    );

    let countFollowers = await page2.$eval(
      "section > main > div > ul > li:nth-child(2) > a > div > span > span",
      (el: any) => el.firstChild?.data
    );

    countFollowers = Number(countFollowers.replace(".", ""));

    await page2.goto(`https://www.instagram.com/nekr0zi/followers`);
  }

  work();
}

export default debug;
