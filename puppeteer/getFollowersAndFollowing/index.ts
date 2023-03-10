import auth from "../auth";
import launch from "../launch";
import passThroughAndGet from "../passThroughAndGet";

async function getFollowersAndFollowing(user: string) {
    let response: any = [];
    const browser = await launch();

    const page = await browser.newPage();

    await auth(page);

    await page.waitForSelector(
        "div > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div > div.x78zum5.xdt5ytf.x10cihs4.x1t2pt76.x1n2onr6.x1ja2u2z > div.x9f619.xnz67gz.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1qughib > div.xh8yej3.x1gryazu.x10o80wk.x14k21rp.x1porb0y.x17snn68.x6osk4m > section > main > div"
    );

    const page2 = await browser.newPage();
    
    let f1: Array<any> = [];
    let f2: Array<any> = [];
    response['followers'] = Object.values(await passThroughAndGet('followers', f1, page2, user))[0];
    response['following'] = Object.values(await passThroughAndGet('following', f2, page2, user))[0];
    browser.close();
    return response

}

export default getFollowersAndFollowing