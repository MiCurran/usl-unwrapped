const cheerio = require('cheerio');

async function scrapeTeamData(tableHtml) {
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
      console.log($event);
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
}

module.exports = { scrapeTeamData };
