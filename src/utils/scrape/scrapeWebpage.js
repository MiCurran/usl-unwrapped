const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { scrapeMatchDetails } = require('./scrapeMatchDetails');
const { scrapeGeneralStats } = require('./scrapeGeneralStats');
const { scrapeTeamData } = require('./scrapeTeamData');

async function scrapeWebpage(url) {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitForSelector('div.LinksPart');

    // Extract the links from the div with class 'LinksPart'
    const links = await page.evaluate(() => {
      const linkElements = Array.from(document.querySelectorAll('div.LinksPart a'));
      return linkElements.map(link => link.href);
    });

    const match_week = url.split('/').slice(3).join('/').replace('-results', '');
    const directoryPath = path.join(__dirname, match_week); // Replace with your desired path
    fs.mkdir(directoryPath, (err) => {
      if (err) {
        console.error('Error creating directory:', err);
      } else {
        console.log('Directory created successfully.');
      }
    });

    for (const link of links) {
        const page = await browser.newPage();
        await page.goto(link);

        const selector = '#siteFooter';

    // scroll selector into view
// Scroll to the desired element
await page.evaluate(() => {
  const element = document.querySelector('#siteFooter'); // Replace with the appropriate selector
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }
});

// Wait for a moment to allow the content to load and scrolling to finish
await page.waitForTimeout(2000); // Adjust the timeout as needed

// Now you can scrape the content
const scrapedContent = await page.content();
        // Wait for the relevant elements to be loaded
        await page.waitForSelector('div.Opta-Cf.Opta-Events');
        await page.waitForSelector('table');
        await page.waitForSelector('table tbody tr'); // Wait for <tr> tags
        await page.waitForFunction(() => document.querySelectorAll('table tbody tr').length > 0);
        const eventsHtml = await page.$eval('div.Opta-Cf.Opta-Events', element => element.innerHTML);
        const tableHtmlList = await page.$$eval('table', tables => {
          return tables.map(table => table.innerHTML);
        });
        const tableOuterHtml = await page.$$eval('table', tables => {
          return tables.map(table => table.outerHTML);
        });
        const tableHtml = await page.$eval('table', table => table.innerHTML);
        // Extract match details
          const generalStats = tableHtmlList[4];
          const distributionStats = tableHtmlList[5]
          const attackStats = tableHtmlList[6];
          const defenseStats = tableHtmlList[7];
          const disciplineStats = tableHtmlList[8];


      let extractedMatchDetails = await scrapeMatchDetails(tableHtml);
      const GENERAL_STATS = await scrapeGeneralStats(generalStats, 0);
      const DISTRIBUTION_STATS = await scrapeGeneralStats(distributionStats, 1)
      const ATTACK_STATS = await scrapeGeneralStats(attackStats, 2)
      const DEFENSE_STATS = await scrapeGeneralStats(defenseStats, 3)
      const DISCIPLINE_STATS = await scrapeGeneralStats(disciplineStats, 4)
      const LINEUPS = {
        home: await scrapeTeamData(tableOuterHtml[1]),
        away: await scrapeTeamData(tableOuterHtml[2])
      }
      extractedMatchDetails[0].lineup = LINEUPS.home;
      extractedMatchDetails[1].lineup = LINEUPS.away;

        const events = await page.evaluate(eventsHtml => {
          const ulDOM = document.createElement('ul');
          ulDOM.innerHTML = eventsHtml;
  
          const liElements = ulDOM.querySelectorAll('li');
  
          const extractedEvents = [];
          liElements.forEach(li => {
            const timeElement = li.querySelector('.Opta-Time');
            const time = timeElement ? timeElement.textContent.trim() : '';
  
            const commentElement = li.querySelector('.Opta-comment');
            const event = commentElement ? commentElement.textContent.trim() : '';
  
            if (time && event) {
              extractedEvents.push({ time, event });
            }
          });
        const reversedEvents = extractedEvents.reverse();
          return reversedEvents;
        }, eventsHtml);
        
        const matchName = link.split('/').pop(); // Assuming the match name is the last part of the URL
        const filePath = path.join(directoryPath, `${matchName}_events.json`);
        fs.writeFileSync(filePath, JSON.stringify({
          matchDetails: extractedMatchDetails, 
          stats: {
            GENERAL_STATS, 
            DISTRIBUTION_STATS,
            ATTACK_STATS,
            DEFENSE_STATS,
            DISCIPLINE_STATS
          }, 
          events: events
        }, null, 2));
  
        console.log(`Scraped content for ${matchName} written to ${filePath}`);
        await page.close(); // Close the page after scraping
      }

    await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = { scrapeWebpage };

// In Puppeteer a screenshot can be taken using the screenshot() method of page or element objects: 
// const puppeteer = require('puppeteer'); async function run() { 
// usual browser startup: const browser = await puppeteer