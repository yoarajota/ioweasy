const puppeteer = require("puppeteer");
require("dotenv").config();

const query = () => {
  let b = document.getElementsByClassName(
    "_ab8w  _ab94 _ab97 _ab9f _ab9k _ab9p  _ab9- _aba8 _abcm"
  );
  let arr = [];
  for (let x of b) {
    arr.push(
      x.children[1]?.firstChild?.firstChild?.firstChild?.firstChild?.firstChild
        ?.firstChild?.firstChild?.firstChild?.data ?? x.children[1]?.firstChild?.firstChild?.firstChild?.firstChild?.firstChild
          ?.firstChild?.firstChild?.data
    );
  }
  return arr;
};

async function getFollowers(users) {
  let response = {};
  let tryes = 5;

  async function work() {
    try {
      const browser = launch()

      const page = await browser.newPage();

      await auth(page)

      await page.waitForSelector(
        "div > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div > div.x78zum5.xdt5ytf.x10cihs4.x1t2pt76.x1n2onr6.x1ja2u2z > div.x9f619.xnz67gz.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1qughib > div.xh8yej3.x1gryazu.x10o80wk.x14k21rp.x1porb0y.x17snn68.x6osk4m > section > main > div"
      );

      const page2 = await browser.newPage();

      for (let user of users) {
        if (response[user] !== undefined) continue

        await page2.goto(`https://www.instagram.com/${user}`);

        await page2.waitForSelector(
          "section > main > div > ul > li > a > div > span > span"
        );

        let countFollowers = await page2.$eval(
          "section > main > div > ul > li:nth-child(2) > a > div > span > span",
          (el) => el.firstChild?.data
        );

        countFollowers = Number(countFollowers.replace('.', ''))

        await page2.goto(`https://www.instagram.com/${user}/followers`);

        await page2.waitForSelector(
          "div > div > div > div:nth-child(4) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.x7r02ix.xf1ldfh.x131esax.xdajt7p.xxfnqb6.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe > div > div > div.x1qjc9v5.x78zum5.xdt5ytf > div > div._ab8w._ab94._ab97._ab9h._ab9m._ab9p._abch._abcm > h1 > div"
        );

        let oldSrollHeight;
        let iterationsLimit = 30;
        while (countFollowers > 0) {
          await page2.waitForSelector(
            "div > div > div > div:nth-child(4) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.x7r02ix.xf1ldfh.x131esax.xdajt7p.xxfnqb6.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe > div > div > div._aano"
          );
          let scroll = await page2.$eval(
            "div > div > div > div:nth-child(4) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.x7r02ix.xf1ldfh.x131esax.xdajt7p.xxfnqb6.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe > div > div > div._aano",
            (el) => el.scrollHeight
          );


          if (oldSrollHeight !== scroll) {
            countFollowers--
            iterationsLimit = 30;
          }

          iterationsLimit--;
          oldSrollHeight = scroll

          await page2.evaluate(() => {
            let a = document.querySelector(
              "div > div > div > div:nth-child(4) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.x7r02ix.xf1ldfh.x131esax.xdajt7p.xxfnqb6.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe > div > div > div._aano"
            );
            a.scrollTop = a.scrollHeight;
          });

          if (iterationsLimit === 0) countFollowers = 0;
        }


        let arr = await page2.evaluate(query);
        await browser.close();

        response = { ...response, [user]: arr }
      }

      return { status: 'success', data: response }
    } catch (error) {
      if (tryes !== 0) {
        tryes--
        work()
      } else if (tryes === 0) {
        return { erro: error, status: 'error' }
      }
    }
  }

  return work();
}

module.exports = { getFollowers };
