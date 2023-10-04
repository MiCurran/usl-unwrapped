import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
@Injectable()
export class ScrapingService {
    async scrapeLiveScores(): Promise<any[]> {
        const returnArr = [];
        const url = 'https://www.uslchampionship.com/league-scores'
          try {
            const browser = await puppeteer.launch({ headless: 'new' });
            const page = await browser.newPage();
        
            await page.goto(url);
            console.log('scraping url:', url)
            // ||||||----------THIS IS FOR 2023 ONLY--------------||||||||
          // Extract the links from the div with class 'LinksPart'    
            await page.waitForSelector('div.LinksPart');
            const links = await page.evaluate(() => {
              const linkElements = Array.from(document.querySelectorAll('div.LinksPart a:first-child'));
              return linkElements.map(link => (link as HTMLAnchorElement).href).slice(0,3);
            });
            console.log('links:', links)
            const errorArr = [];
        
            for (const link of links) {

              try {
                console.log('now scraping link', link)
                const page = await browser.newPage();
                const response = await page.goto(link);
                console.log(response.status())
                if (response.status() === 404){
                  const errorObj = {match: null, error: null}
                  console.error(`404 ERROR on match: ${link}`)
                  errorObj.error = `404 ERROR on match: ${link}`
                  errorObj.match = link
                  errorArr.push(errorObj);
                  continue;
                }
                const selector = 'footer.snFooterContainer';
                 // scroll selector into view
                // Scroll to the desired element
                await page.evaluate(() => {
                  const element = document.querySelector('#siteFooter');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                  }
                });
                // Wait for a moment to allow the content to load and scrolling to finish
                await page.waitForTimeout(2000);
                try {
                await page.waitForFunction(() => document.querySelectorAll('table tbody tr').length > 0);
                } catch (err) {
                  errorArr.push({ error: 'Timeout waiting for table tbody tr', match: link });
                  continue;  
                }
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
              let GENERAL_STATS, DISTRIBUTION_STATS, ATTACK_STATS, DEFENSE_STATS, DISCIPLINE_STATS;
        
              try {
                  GENERAL_STATS = await scrapeGeneralStats(generalStats, 0, 'GENERAL') ;
                  DISTRIBUTION_STATS = await scrapeGeneralStats(distributionStats, 1, 'DISTRIBUTION' )
                  ATTACK_STATS = await scrapeGeneralStats(attackStats, 2, "ATTACK")
                  DEFENSE_STATS = await scrapeGeneralStats(defenseStats, 3, 'DEFENSE')
                  DISCIPLINE_STATS = await scrapeGeneralStats(disciplineStats, 4, 'DISCIPLINE')
              } catch (err){
                const errorObj = {match: null, message: err.message, stack: err.stack}
                console.error(`ERROR in scrapeGeneralStats: ${err}`);
                errorObj.match = link;
                errorArr.push(errorObj);
              }
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
                
                // OKAY RIGHT HERE WE WANT TO RETURN THIS JSON OBJECT INSTEAD OF WRITING IT TO A FILE
                const returnData = {
                  matchDetails: extractedMatchDetails, 
                  stats: {
                    GENERAL_STATS, 
                    DISTRIBUTION_STATS,
                    ATTACK_STATS,
                    DEFENSE_STATS,
                    DISCIPLINE_STATS
                  }, 
                  events: events
                };
                await page.close(); // Close the page after scraping
                console.log(returnData.matchDetails);
                returnArr.push(returnData);
              } 
                //-----THIS CATCH STATEMENT IS FOR EACH MACH URL-----\\
              catch (err){
                console.error(`ERROR: ${err}`)
                errorArr.push({error: err, match: link})
              }
              }
        
            await browser.close();
          
            console.log('----✅----')
            console.log(`Done! Successfully scraped live matches ${url}`)
            return returnArr.slice(0,3);
          }
          //-----THIS CATCH STATEMENT IS FOR THE MATCH WEEK URL TOP MOST LEVEL-----\\
          catch (err) {
            console.error(`Error: Live Results`, err);
          }
    }
}

const genKeys = [
    'Possession',
    'Duels_Success_Rate',
    'Ariel_Duels_Won',
    'Interceptions',
    'Offsides',
    'Corners_Won'
    ];
const distKeys = [
    'Passes',
    'Long_Passes',
    'Passing_Accuracy',
    "Passing_Accuracy_In_Opponent_Half",
    "Crosses",
    "Crossing_Accuracy"
    ]
    const attackKeys = [
        'Goals',
        'Shots',
        'Shots_On_Target',
        "Blocked_Shots",
        "Shots_Outside_Box",
        "Shots_Inside_Box",
        "Shooting_Accuracy"
        ]
        const defenseKeys = [
            'Tackles',
            'Tackle_Success_Rate',
            'Clearances',
        ]
        const disciplineKeys = [
            'Fouls_Conceded',
            'Yellow_Cards',
            'Red_Cards',
        ]
const keysArr = [
    genKeys,
    distKeys,
    attackKeys,
    defenseKeys,
    disciplineKeys
]

async function scrapeGeneralStats(tableHtml, indexToScrape, statType) {
const keys = keysArr[indexToScrape]
 try {
    const $ = cheerio.load(tableHtml);
  // Find all the div elements with class "Opta-Bars-Full"
  const divs = $('div.Opta-Bars-Full');

  const generalStats = {home: {}, away: {}};

  // Iterate through each div element
  divs.each((index, div) => {
    const $div = $(div);

    // Find the span elements inside this div
    const spans = $div.find('span.Opta-Percent');

    // Extract the home and away values
    const homeValue = spans.eq(0).text().trim();
    const awayValue = spans.eq(1).text().trim();

    generalStats.away[keys[index]] = awayValue;
    generalStats.home[keys[index]] = homeValue;


});

    return { ...generalStats };
} catch (err) {
/*     console.error(error(`‼️ Error Processing stats`))
    console.error(error(`For match: ${matchUrl}`)) */
    throw new Error(`Error processing ${statType} stats in scrapeGeneralStats module:\n${err.stack}`);
} 
}


async function scrapeMatchDetails(tableHtml) {
    try {
      const $ = cheerio.load(tableHtml);
      const extractedMatchDetails = [];
      let row = $('a.Opta-TeamLink.Opta-Ext').first(); // Start with the first team link
      const matchDate = $('span.Opta-Date').first().text().trim();
  
      while (row.length) {
        const homeFormation = row.next('.Opta-TeamFormation').text().trim();
        const homeScore = row.nextAll('span.Opta-Team-Score').eq(0).text().trim();
  
        const awayTeamName = row.nextAll('a.Opta-TeamLink.Opta-Ext').eq(1).text().trim();
        const homeTeamName = row.nextAll('a.Opta-TeamLink.Opta-Ext').eq(0).text().trim();
        const awayFormation = row.nextAll('.Opta-TeamFormation').eq(1).text().trim();
        const awayScore = row.nextAll('span.Opta-Team-Score').eq(1).text().trim();
  // Extract the match date from the Opta-Date span
  // Extract the match date from the Opta-Date span
        extractedMatchDetails.push({
          homeTeam: homeTeamName,
          formation: homeFormation,
          score: homeScore,
        });
  
        extractedMatchDetails.push({
          awayTeam: awayTeamName,
          formation: awayFormation,
          score: awayScore,
        });
        extractedMatchDetails.push({
          date: matchDate
        })
        // Move to the next row
        row = row.closest('tr').next('tr').find('a.Opta-TeamLink.Opta-Ext').first();
      }
      return extractedMatchDetails;
    } catch (err) {
      console.error('Error occurred while scraping match details:', err);
      throw new Error(`Error processing match details in scrapeMatchDetails module:\n${err.stack}`);
    }
  }
  
async function scrapeTeamData(tableHtml) {
  try {
    const $ = cheerio.load(tableHtml);
  const players = [];

  // Find all rows with class "Opta-Player"
  const playerRows = $('tr.Opta-Player');

  // Iterate through each player row
  playerRows.each((index, row) => {
    const $row = $(row);

    // Extract player shirt number
    const shirtNumber = $row.find('td.Opta-Shirt').text().trim();

    // Extract player name and position
    const playerName = $row.find('td.Opta-Name a.Opta-PlayerLink').text().trim();
    const playerPosition = $row.find('td.Opta-Position abbr').attr('title').trim();

    // Extract player events (e.g., substitutions, yellow cards)
    const playerEvents = $row.find('span.Opta-Event-Text').map((i, event) => {
      const $event = $(event);
      const eventText = $event.prev('span.Opta-Icon').attr('title');
      const eventTime = $event.find('span.Opta-Event-Time').text().trim().replace(/[^0-9]/g, ''); // Extract only digits
      return {
        event: eventText || '',
        eventTime: eventTime,
      };
    }).get();

    // Create player object
    const player = {
      shirtNumber,
      playerName,
      playerPosition,
      playerEvents,
    };

    // Add player object to the players array
    players.push(player);
  });

  // Extract manager information
  const managerName = $('tr.Opta-Manager td.Opta-Name').text().trim();

  // Create the team object
  const teamData = {
    managerName,
    players,
  };

  return teamData;
  } catch (err) {
    console.error(err)
    throw new Error(`Error processing team data in scrapeTeamData module:\n${err.stack}`);
  }
}