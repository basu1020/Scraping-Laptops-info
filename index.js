const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')

const fetcherOfWebsite = async (url) => {

    const response = await fetch(url)
    const html = await response.text()
    // fs.writeFile('html1.html', html, (err) => {
    //     if (err) {
    //         console.error('error', err)
    //     }
    // })

    const parser = cheerio.load(html)

    const retArr = []

    // price too and all the info 
    // parser('.product-item-details', html).each(function () {
    // const url = parser(this).find('a').attr('href')
    // const title = parser(this).find('h2').text()
    // const processorFamily = parser(this).find('.processorfamily').text()
    // const osInstalled = parser(this).find('.osinstalled').text().split("Home")[0]
    // const display = parser(this).find('.osinstalled').text().split("Home")[1]
    // const graphixCard = parser(this).find('.graphicseg_01card_01-graphicseg_02card_01').text()
    // const ram = parser(this).find('.memstdes_01').text().split(")")
    // const storage = parser(this).find('.memstdes_01').text().split(")")[1]

    parser('.product-desc-features').each(function () {
        console.log('found')
        parser(this).find('ul').each(function () {
            let str = ''
            parser(this).find('li').each(function () {
                str = str + `|${parser(this).text()}`
            })

            let specs = ["", "CPU", "OS Installed", "Screen", "Graphics", "RAM", "Storage", "Weight"]
            let refStr = str.split('|')
            let obj = {}
            for (let i = 0; i < specs.length; i++){
                obj[specs[i]] = refStr[i]
            }
            retArr.push(obj)
            str = ''
        })
    }) 

    return retArr
}

const execute = async () => {
    const res = await fetcherOfWebsite("https://www.hp.com/in-en/shop/laptops-tablets/personal-laptops/omen-laptops.html?product_list_limit=30&product_list_order=price_asc")

    // const res2 = await fetcherOfWebsite('https://www.hp.com/in-en/shop/laptops-tablets/personal-laptops/omen-laptops.html?p')

    // const final = JSON.stringify(res, null, 2)
    // fs.writeFile('data.txt', final, 'utf8', (err) => {
    //     if (err) {
    //         console.error('error', err)
    //         return
    //     }
    // })
    
    // console.log('file written successfully')
    // console.log(res)
}

execute()





