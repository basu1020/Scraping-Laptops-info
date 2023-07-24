// const puppeteer = require('puppeteer');

// async function scrapeSpecifications() {
//     const browser = await puppeteer.launch({ headless: "new" });
//     const page = await browser.newPage();
//     await page.goto('https://www.lenovo.com/in/en/laptops/legion-laptops/legion-5-series/Legion-5-15ACH6H/p/88GMY501582');

//     await page.waitFor("div.bv-rnr__sc-16dr7i1-1.jPLiFm");


//     // Extract table rows
//     const tableRows = await page.$$eval("div.bv-rnr__sc-16dr7i1-1.jPLiFm", (elements) =>
//         elements.map(e => {
//             console.log("Hale luia")
//             console.log(e.querySelectorAll("span.bv-rnr__sc-bm6gry-0.iakSCb")[0].textContent)
//             return {
//                 stars: e.querySelectorAll('span.bv-rnr__sc-bm6gry-0.iakSCb')[0].textContent,
//                 quotedReview: e.querySelector('div.bv-rnr__sc-16dr7i1-3.hUwIyZ').textContent
//             }
//         })
//     );

//     await browser.close();
//     // console.log(tableRows)
//     return tableRows
// }

// scrapeSpecifications()
//     .then((res) => console.log(res))
//     .catch((error) => console.log(error))

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  
  // Go to the page with the customer feedback
  await page.goto('https://www.lenovo.com/in/en/laptops/legion-laptops/legion-5-series/Legion-5-15ACH6H/p/88GMY501582');

  await autoScroll(page)

  // Extract the star rating and written feedback
  const feedbackDivs = await page.$$eval('div.bv-rnr__sc-16dr7i1-1.jPLiFm', divs => {
    return divs.map((div) => {
      const ratingValue = div.querySelector('meta[itemprop="ratingValue"]').getAttribute('content');
      const writtenFeedback = div.querySelector('div.bv-rnr__sc-16dr7i1-23.ljNKOA').innerText.trim();

      console.log(ratingValue, writtenFeedback, div.querySelector('meta[itemprop="ratingValue"]'))

      console.log("I am in here")
      return { rating: ratingValue, feedback: writtenFeedback };
    });
  });

  console.log(feedbackDivs);

  await browser.close();
})();

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 100;
      const scrollInterval = setInterval(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(scrollInterval);
          resolve();
        }
      }, 100);
    });
  });
}


