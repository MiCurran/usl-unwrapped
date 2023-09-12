const cheerio = require('cheerio');

async function scrapeMatchDetails(tableHtml) {
  try {
    const $ = cheerio.load(tableHtml);
    const extractedMatchDetails = [];

    let row = $('a.Opta-TeamLink.Opta-Ext').first(); // Start with the first team link

    while (row.length) {
      const homeFormation = row.next('.Opta-TeamFormation').text().trim();
      const homeScore = row.nextAll('span.Opta-Team-Score').eq(0).text().trim();

      const awayTeamName = row.nextAll('a.Opta-TeamLink.Opta-Ext').eq(1).text().trim();
      const homeTeamName = row.nextAll('a.Opta-TeamLink.Opta-Ext').eq(0).text().trim();
      const awayFormation = row.nextAll('.Opta-TeamFormation').eq(1).text().trim();
      const awayScore = row.nextAll('span.Opta-Team-Score').eq(1).text().trim();

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

      // Move to the next row
      row = row.closest('tr').next('tr').find('a.Opta-TeamLink.Opta-Ext').first();
    }

    return extractedMatchDetails;
  } catch (error) {
    console.error('Error occurred while scraping match details:', error);
    return []; // Return an empty array or handle the error as needed.
  }
}

module.exports = { scrapeMatchDetails };
