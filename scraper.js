const puppeteer = require("puppeteer");
const fs = require("fs");

let browser;

//* main scrape function to get all job information

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
        title: listing.querySelector(".css-1m4cuuf span").textContent.trim(),
        company: listing
          .querySelector(".heading6 .companyName")
          .textContent.trim(),
        location: listing
          .querySelector(".heading6 .companyLocation")
          .textContent.trim(),
        datePosted: listing
          .querySelector(".heading6 .date ")
          .textContent.trim(),
        snippet: listing.querySelector(".job-snippet li").textContent.trim(),
        url: listing.querySelector(".jobTitle a.jcs-JobTitle").href,
      };
    });
  });

  let data = [];
  let count = 0;

  //* loop to get all job details according to provided number
  while (data.length < number) {
    if (!jobListings[count]) {
      break;
    } else {
      data.push(jobListings[count]);
      count++;
    }
  }

  //* getting all job details and creating new json file
  fs.writeFile(`results.json`, JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("data scraped successfully");
  });
  browser.close();
};

module.exports = scraper;
