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
    // const page3 = await browser.newPage();

    // return await Promise.all([passThroughAndGet('followers', response, page2, user), passThroughAndGet('following', response, page3, user)])
    //     .then((res) => {
    //         let values: any = Object.values(res);
    //         response['followers'] = values[0][user];
    //         response['following'] = values[1][user];
    //         response['followers'] = passThroughAndGet('followers', response, page2, user);
    //         response['following'] = passThroughAndGet('following', response, page3, user);
    //         browser.close();
    //         return response;
    //     })
    
    response['followers'] = await passThroughAndGet('followers', response, page2, user);
    response['following'] = await passThroughAndGet('following', response, page2, user);
    browser.close();
    return response

}

export default getFollowersAndFollowing