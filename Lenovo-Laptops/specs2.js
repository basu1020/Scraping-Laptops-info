const puppeteer = require('puppeteer');

async function scrapeSpecifications() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto('https://www.lenovo.com/in/en/laptops/legion-laptops/legion-5-series/Legion-5-15ACH6H/p/88GMY501582');

    // Extract table rows
    const tableRows = await page.$$eval('table.techSpecs-table tbody tr', (rows) =>
        rows.map((row) => {
            const description = row.querySelector('td:nth-child(1)');
            const specifications = row.querySelector('td:nth-child(2)');
            return {
                description: description ? description.textContent.trim() : '',
                specifications: specifications ? specifications.textContent.trim() : '',
            };
        })
    );

    // Build specifications object
    const specifications = {};
    tableRows.forEach((row) => {
        specifications[row.description] = row.specifications;
    });

    await browser.close();

    return specifications;
}

scrapeSpecifications()
    .then((specifications) => console.log(specifications))
    .catch((error) => console.error(error));
