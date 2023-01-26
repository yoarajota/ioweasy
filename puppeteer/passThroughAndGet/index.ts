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
          ?.firstChild?.firstChild?.firstChild?.data ??
        x.children[1].firstChild?.firstChild?.firstChild?.firstChild?.firstChild
          ?.firstChild?.firstChild?.firstChild?.firstChild?.data
    );
  }

  return arr;
};

async function passThroughAndGet(type: string, response: Array<any>, page: any, user: string) {
  await page.goto(`https://www.instagram.com/${user}`);

  await page.waitForSelector(
    "section > main > div > ul > li > a > div > span > span"
  );

  let countFollowers = await page.$eval(
    "section > main > div > ul > li:nth-child(2) > a > div > span > span",
    (el: any) => el.firstChild?.data
  );

  countFollowers = Number(countFollowers.replace(".", ""));

  await page.goto(`https://www.instagram.com/${user}/${type}`);

  await page.waitForSelector(
    "div > div > div > div:nth-child(4) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.x7r02ix.xf1ldfh.x131esax.xdajt7p.xxfnqb6.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe > div > div > div.x1qjc9v5.x78zum5.xdt5ytf > div > div._ab8w._ab94._ab97._ab9h._ab9m._ab9p._abch._abcm > h1 > div"
  );

  let oldSrollHeight;
  let iterationsLimit = 30;
  while (countFollowers > 0) {
    await page.waitForSelector(
      "div > div > div > div:nth-child(4) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.x7r02ix.xf1ldfh.x131esax.xdajt7p.xxfnqb6.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe > div > div > div._aano"
    );
    let scroll = await page.$eval(
      "div > div > div > div:nth-child(4) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.x7r02ix.xf1ldfh.x131esax.xdajt7p.xxfnqb6.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe > div > div > div._aano",
      (el: any) => el.scrollHeight
    );

    if (oldSrollHeight !== scroll) {
      countFollowers--;
      iterationsLimit = 30;
    }

    iterationsLimit--;
    oldSrollHeight = scroll;

    await page.evaluate(() => {
      let a = document.querySelector(
        "div > div > div > div:nth-child(4) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.x7r02ix.xf1ldfh.x131esax.xdajt7p.xxfnqb6.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe > div > div > div._aano"
      );

      if (a) a.scrollTop = a?.scrollHeight ?? 0;
    });

    if (iterationsLimit === 0) countFollowers = 0;
  }

  let arr = await page.evaluate(query);
  return { ...response, [user]: arr };
}

export default passThroughAndGet