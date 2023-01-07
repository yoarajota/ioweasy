const puppeteer = require("puppeteer");

async function launch() {
    return await puppeteer.launch({
        headless: false,
        slowMo: 10,
        devtools: false,
        defaultViewport: {
            width: 375,
            height: 667,
        },
    });
}

module.exports = { launch };
