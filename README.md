# Scraping-Laptops-info
Scrapped laptops information from popular websites like Dell, Lenovo and HP. 
## Description

This repository contains a Node.js application that serves as a web scraper to gather information about gaming laptops and their specifications from various websites. The scraper uses the Node-fetch and Cheerio packages to fetch and parse the HTML content of the target websites, extracting the relevant data.

## Packages Used

- **Node-fetch**: A lightweight, promise-based HTTP client for making API requests. It is used to fetch the HTML content of the target website to be scraped.

- **Cheerio**: A fast, flexible, and lean implementation of the core jQuery designed for server-side HTML parsing. It allows us to parse and manipulate the fetched HTML content easily, extracting the required data.

## How it Works

The scraper is designed to fetch gaming laptop specifications from specific URLs. The `fetcherOfWebsite` function is responsible for fetching the HTML content of the given URL using `node-fetch`. It then uses `cheerio` to parse the HTML and extract the relevant information about each gaming laptop.

The extracted data is organized into an array of objects, where each object represents the specifications of a single gaming laptop. The specifications include details such as CPU, OS Installed, Screen, Graphics, RAM, Storage, and Weight.

## Example Data

The scraped data is stored in a `data.txt` file in JSON format. Below is an example of the extracted gaming laptop specifications:

```json
[
  {
    "CPU": "AMD Ryzen™ 7 processor",
    "OS Installed": "Windows 11 Home",
    "Screen": "16.1 diagonal FHD 144 Hz 7 ms response time300 nits",
    "Graphics": "AMD Radeon™ RX 6650M 8 GB dedicated Graphics",
    "RAM": "512 GB 4x4 SSD Storage",
    "Storage": "16 GB DDR5-4800 MHz RAM",
    "Weight": "Weighs: Starting at 2.35 kg"
  },
  // ... (other laptop specifications)
]
```

# Gaming Laptop Scraper with Puppeteer

## Description

This repository contains a Node.js application that serves as a web scraper to gather information about gaming laptops and their specifications from various websites. The scraper now uses Puppeteer, along with Node-fetch and Cheerio, to extract data from Dell's gaming laptop deals page.

## Packages Used

- **Puppeteer**: A headless browser automation library that provides a high-level API for interacting with web pages. Puppeteer is used to navigate to the target website, interact with the page, and extract information that cannot be easily obtained with Cheerio.


## How it Works

The scraper now has an additional `fethcer` function, which utilizes Puppeteer to navigate through the Dell gaming laptop deals page and gather the following information for each laptop:

- **Photos**: Images of the laptop extracted from the website.

- **Specifications**: Various specifications of the laptop, such as processor, RAM, storage, etc.

To achieve this, the `fethcer` function uses Puppeteer to navigate to the Dell gaming laptop deals page. It then selects all the laptop listings, extracting their URLs. Next, it iterates through each laptop's URL and navigates to the individual laptop page to gather the photos and specifications.

The extracted data for each laptop is organized into an array of objects, where each object represents the specifications and photos of a single laptop.
