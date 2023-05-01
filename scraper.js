const puppeteer = require("puppeteer");
const fs = require("fs");

let browser;

//* main scrape function to scrape all job information

const scraper = async (query, number) => {
  browser = await puppeteer.launch({ headless: false });
  const [page] = await browser.pages();
  const url = "https://indeed.com";
  await page.goto(url, { waitUntil: "domcontentloaded" });

  await page.type("#text-input-what", query);
  await page.click(".yosegi-InlineWhatWhere-primaryButton");

  //todo code for navigation buttons to be implemented
  //todo await page.waitForSelector(".css-13p07ha");
  //todo await page.click(".css-13p07ha");

  await page.waitForSelector(".cardOutline");

  //* fetch all job details from first page

  const jobListings = await page.$$eval(".cardOutline", (listings) => {
    return listings.map((listing) => {
      return {
        //* scrape job title
        title: listing.querySelector(".css-1m4cuuf span").textContent.trim(),

        //* scrape company name
        company: listing
          .querySelector(".heading6 .companyName")
          .textContent.trim(),

        //* scrape company location
        location: listing
          .querySelector(".heading6 .companyLocation")
          .textContent.trim(),

        //* scrape date of job posting
        datePosted: listing
          .querySelector(".heading6 .date ")
          .textContent.trim(),

        //* scrape description of job posting
        snippet: listing.querySelector(".job-snippet li").textContent.trim(),

        //* scrape url of job posting
        url: listing.querySelector(".jobTitle a.jcs-JobTitle").href,
      };
    });
  });

  let data = [];
  let count = 0;

  //* loop to scrape all job details according to provided number if number is greater than available data, it will avoid infinite loop and create only available data
  while (data.length < number) {
    if (!jobListings[count]) {
      break;
    } else {
      data.push(jobListings[count]);
      count++;
    }
  }

  //* scrapeting all job details and creating new json file
  fs.writeFile(`results.json`, JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("data scraped successfully");
  });
  browser.close();
};

module.exports = scraper;
