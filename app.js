'use strict';

const puppeteer = require('puppeteer');

const samplePage = 'https://github.com/puppeteer/puppeteer';
const genImgFileName = 'sample.png';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(samplePage);
  await page.screenshot({
    path: genImgFileName
  });

  await browser.close();
})();
