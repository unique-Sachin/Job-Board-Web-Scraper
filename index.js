const scraper = require("./scraper");
const process = require("process");

const args = process.argv.slice(2);

const getJobs = async () => {
  const number = args[args.length - 1];
  args.pop();
  const query = args.join(" ");
  try {
    if (args.length < 2) throw new Error("Please specify both details");
    
    //* importing scraper function from scraper.js file go get jobs listings
    await scraper(query, number);
  } catch (error) {
    console.log(error);
  }
};

getJobs();
