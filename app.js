'use strict';

const puppeteer = require('puppeteer');

const targetPage = 'https://qiita.com';
const searchKeyword = 'JavaScript';

(async () => {
  const browser = await puppeteer.launch({
    // headless-mode
    headless: false
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1200,
    height: 1000
  });

  await page.goto(targetPage);

  // find form & input keyword
  await page.type('input[class="st-Header_searchInput"]', searchKeyword);

  // (after input keyword into form) click Enter key
  await page.keyboard.press('Enter');
  await page.waitForNavigation({
    waitUntil: "domcontentloaded"
  });

  // sleep
  await page.waitFor(1000);

  const result = await page.evaluate(() => {
    const array = [];
    const elementsTitle = document.querySelectorAll("h1.searchResult_itemTitle > a");

    elementsTitle.forEach((item) => {
      array.push({
        title: item.innerText,
        url: item.href
      });
    })
    return array;
  });

  console.log(result);

  // sleep
  await page.waitFor(2000);

  await browser.close();
})();
