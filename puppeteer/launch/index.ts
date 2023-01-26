const puppeteer = require("puppeteer");

async function launch(debug = false) {
  return await puppeteer.launch({
    headless: !debug,
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
