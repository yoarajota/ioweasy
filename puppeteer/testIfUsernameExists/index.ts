import auth from "../auth";
import launch from "../launch";

async function testIfUsernameExists(user: string) {
    const browser = await launch();
    const page = await browser.newPage();

    await page.goto(`https://www.instagram.com/${user}`);

    let exists;

    await Promise.race([
        page.waitForSelector(
            "div > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div > div.x78zum5.xdt5ytf.x10cihs4.x1t2pt76.x1n2onr6.x1ja2u2z > section > main > div > header > section > div._ab8w._ab94._ab99._ab9f._ab9m._ab9p._abcm > div > div > button", { timeout: 7000 }
            , { timeout: 6000, visible: true })
            .then(() => { exists = true }).catch(),
        page.waitForSelector(
            "div > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div > div.x78zum5.xdt5ytf.x10cihs4.x1t2pt76.x1n2onr6.x1ja2u2z > section > main > div > div > div > div"
            , { timeout: 6000, visible: true })
            .then(() => { exists = false }).catch(),
    ]);

    browser.close()
    return exists
}

export default testIfUsernameExists