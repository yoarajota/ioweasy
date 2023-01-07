const { LOGIN, PASSWORD } = process.env;

async function auth(page) {
    try {
        await page.goto("https://www.instagram.com/accounts/login/");
    } catch {
        await page.goto("https://www.instagram.com/");
    }

    await page.waitForSelector(
        "#loginForm > div > div:nth-child(3) > button"
    );
    await page.type("input[name='username']", String(LOGIN), { delay: 6 });
    await page.type("input[name='password']", String(PASSWORD), {
        delay: 6,
    });
    // await page.waitFor(100)
    let btn = await page.waitForSelector(
        "#loginForm > div > div:nth-child(3) > button"
    );
    btn.click();
}

module.exports = { auth };
