const puppeteer = require('puppeteer')

const fethcer = async (url) => {
    const browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage()
    await page.goto(url)

    const res = await page.$$eval('h3.ps-title', (elements) =>
        elements.map(e => (
            e.querySelector('a').href
        ))
    )

    const DellLaptopInfo = []
    let index = 0
    for (const url of res) {
        await page.goto(url)

        let particularInfo = {}

        // photos
        const photoOne = await page.$$eval('figure[role="img"] > img', elements => elements.map(e => e.getAttribute('data-src'))
        )

        // specs 
        const specs = await page.$$eval('.specs.list-unstyled li', elements =>
            elements.map(item => {
                const titleElement = item.querySelector('.h5.font-weight-bold.mb-0');
                const title = titleElement.textContent.trim();

                const valueElement = item.querySelector('p');
                const value = valueElement.textContent.trim();

                return { title ,  value };
            })
        )

        // reviews
        // await page.evaluate(() => {previousHeight = document.body.scrollHeight})
        // console.log(previousHeight, afterHeight)
        // await page.evaluate(() => window.scrollTo({
        //     top:5000,
        //     left: 200,
        //     behavior: "smooth"
        // }))

        // await page.click('section#awards-and-ratings-container')

        // await page.screenshot({path: `example${index}0.png`, fullPage: true})

        // await new Promise((resolve) => setTimeout(resolve, 2000))

        // await page.evaluate(() => window.scrollTo({
        //     top:10000,
        //     left: 200,
        //     behavior: "smooth"
        // }))

        // // await page.click('div#bv_review_maincontainer')
        // await page.waitFor('div#bv_review_maincontainer', {visible: true})

        // await new Promise((resolve) => setTimeout(resolve, 5000))
        
        // await page.screenshot({path: `example${index}.png`, fullPage: true})

        // await new Promise((resolve) => setTimeout(resolve, 5000))
        
        // await page.waitFor('div.bv-rnr_sc-16dr7il-1.jPLiFm', {visible: true})

        // await page.screenshot({path: `example${index}final.png`, fullPage: true})

        // index += 1
        // // page.waitForSelector('.bv-rnr__sc-16dr7i1-3')

        // const reviews = await page.$$eval("div.bv-rnr__sc-16dr7i1-3.kPwaVD", elements => elements.map(e => {
        //     return e
        // }))

        // console.log(reviews)
        // console.log(specs)
        particularInfo.photos = photoOne
        particularInfo.specs = specs
        // console.log(particularInfo)
        // particularInfo.reviews = reviews
        DellLaptopInfo.push(particularInfo)
    }

    await browser.close()
    return DellLaptopInfo
}

const execute = async () => {
    const res = await fethcer('https://www.dell.com/en-in/shop/deals/gaming-deals?gacd=10398392-9024-5761040-286092735-0&dgc=ST')

    console.log(res)
}

execute()

// page.evaluate runs functions in reference to the page we have asked for. 