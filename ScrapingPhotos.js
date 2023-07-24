const fs = require('fs')
const puppeteer = require('puppeteer')

/*
    Home
      |-> Each item
            |-> Visit URL - get information
*/

const fetchImg = async (url) => {

    const browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage()
    await page.goto(url)

    const res = await page.$$eval('div > .fotorama__loaded.fotorama__loaded--img > img', (elements) => 
        elements.map((e) => ({
            title: e.src
        }))
    )

    const heroImg = await page.$$eval('.hero-image', (elements) => 
        elements.map(e => ({
            title: e.style.backgroundImage.slice(4,-1)
        }))
    )

    await browser.close()
    console.log(res)
    return heroImg

}

const execute = async (url) => {
    const res = await fetchImg(url)
    console.log(res)
}

execute("https://www.hp.com/in-en/shop/omen-gaming-laptop-16-n0050ax-6h4n6pa.html?facetref=288660e6ab710880")