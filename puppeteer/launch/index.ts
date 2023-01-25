const puppeteer = require("puppeteer");

async function launch() {
  return await puppeteer.launch({
    headless: true,
    // headless: false,
    slowMo: 10,
    devtools: false,
    defaultViewport: {
      width: 375,
      height: 667,
    },
  });
}

export default launch;
