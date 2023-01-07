import { getFollowers } from "../puppeteer/puppeteer";

export default async function getCurrentFollowers(users: Array<string>) {
    let response;
    let loop = true;
    while (loop) {
        response = await getFollowers(users)
        if (response.status) loop = false
    }

    return response
}