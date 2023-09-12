const cheerio = require('cheerio');

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

async function scrapeGeneralStats(tableHtml, indexToScrape) {
const keys = keysArr[indexToScrape]
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
}

module.exports = { scrapeGeneralStats };
