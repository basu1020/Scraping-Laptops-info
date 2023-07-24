const puppeteer = require('puppeteer')
// const parse5 = require('parse5')

const fetcher = async (url) => {
    const browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage()
    await page.goto(url)

    const res = await page.$$eval('div.rounded-0.px-6.pb-1.product__card__grid__inner-container.text-center.mx-auto.d-flex.flex-column.products-container_single-product-card-grid.v-card.v-card--flat.v-sheet.theme--light', (elements) =>
        elements.map(e => (
            e.querySelector('a.d-flex.flex-column.align-center.justify-space-between').href
        ))
    )
            
    const LenovoLaptopsInfo = []
    for (const url of res) {
        await page.goto(url);

        let particularInfo = {}

        //photos
        const photoInfo = await page.$$eval('figure', elements =>
            elements.map(e => e.querySelector('img').src
            ));

        //specs
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

        //reviews

        particularInfo.photos = photoInfo
        particularInfo.specs = specifications
        LenovoLaptopsInfo.push(particularInfo);
    }
    await browser.close()
    return LenovoLaptopsInfo
}

const execute = async () => {
    const res = await fetcher('https://www.lenovo.com/in/en/dg/LAPTOPS?from=splitter&visibleDatas=facet_Brand%3ALegion&sort=sortBy&resultsLayoutType=grid')
    console.log(res)
}

execute()