# Job Board Web Scraper

This is a web scraper that navigates to indeed.com (job board website), and extracts relevant job listings based on a given search query (e.g., "software engineer," "data analyst," etc.). The scraper can retrieve the following information for each job listing:

- Job title
- Company name
- Location
- Job posting date
- Job description snippet
- URL to the job listing

## Installation

1. Make sure you have Node.js installed on your machine.
2. Clone this repository to your local machine or alternatively, download the zipped file.
3. Navigate to the project's root directory in your terminal.
4. Run `npm install` to install the project's dependencies.

## Usage

To use the web scraper, you will need to run the `index.js` file with Node.js. The scraper requires a search query and the number of job listings to retrieve as arguments. For example:

```
node index.js software engineer 10
```

This command will retrieve the top 10 job listings for the search query "software engineer." The output will be saved to a local file named `results.json`.

## Customization

You can customize the scraper by modifying the `index.js` file. The scraper is built using Puppeteer, a Node.js library that provides a high-level API to control headless Chrome or Chromium. You can modify the scraping logic by editing the `page.evaluate()` method in the `scraper()` function.

## License

This project is licensed under the [MIT License](https://github.com/unique-Sachin/job-board-web-scraper/blob/main/LICENSE). Feel free to use, modify, and distribute the code as you please.

## Support

If you encounter any issues with this web scraper or have any questions, please contact me via email (sachin.mern@gmail.com) or open an issue on this repository.
