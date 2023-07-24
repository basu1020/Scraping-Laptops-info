const puppeteer = require('puppeteer')
const parse5 = require('parse5')

const fetcher = async (url) => {
    const browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage()
    await page.goto(url)

    const res = await page.$$eval('table.techSpecs-table tr', (rows) =>
    rows.map((row) => ({
      description: row.querySelector('td:nth-child(1)').textContent.trim(),
      specifications: row.querySelector('td:nth-child(2)').textContent.trim(),
    }))
}

const extractSpecs = (tableData) => {
    const specs = {};
    const rows = tableData.childNodes[0].childNodes;
  
    let currentKey = '';
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (row.nodeName === 'tr') {
        const cells = row.childNodes;
        if (cells.length === 2) {
          currentKey = cells[0].childNodes[0].value.trim();
          const value = extractValue(cells[1]);
          specs[currentKey] = value;
        }
      }
    }
  
    return specs;
  };
  
const extractValue = (node) => {
    let value = '';
    const childNodes = node.childNodes;
    for (let j = 0; j < childNodes.length; j++) {
      const childNode = childNodes[j];
      if (childNode.nodeName === '#text') {
        value += childNode.value.trim();
      } else if (childNode.nodeName === 'ul') {
        const listItems = childNode.childNodes.filter((child) => child.nodeName === 'li');
        value += listItems.map((li) => li.childNodes[0].value.trim()).join('\n');
      }
    }
    return value;
};

const execute = async (url) => {
    const res = await fetcher(url)
    console.log(res)
}

execute('https://www.lenovo.com/in/en/laptops/legion-laptops/legion-5-series/Legion-5-15ACH6H/p/88GMY501582')