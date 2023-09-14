import { Test, TestingModule } from '@nestjs/testing';
import { MatchesService } from './matches.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

const mockMatches = [
{
    "id": 1,
    "date": new Date as Date,
    "season": "2023",
    "homeTeamId": 1,
    "awayTeamId": 2,
    "homeTeamUslId": 6,
    "awayTeamUslId": 10,
    "score": "2-0",
    "stats": {
        "ATTACK_STATS": {
            "away": {
                "Goals": "0",
                "Shots": "13",
                "Blocked_Shots": "4",
                "Shots_On_Target": "3",
                "Shots_Inside_Box": "11",
                "Shooting_Accuracy": "23.1%",
                "Shots_Outside_Box": "2"
            },
            "home": {
                "Goals": "2",
                "Shots": "13",
                "Blocked_Shots": "4",
                "Shots_On_Target": "5",
                "Shots_Inside_Box": "8",
                "Shooting_Accuracy": "38.5%",
                "Shots_Outside_Box": "5"
            }
        },
        "DEFENSE_STATS": {
            "away": {
                "Tackles": "21",
                "Clearances": "10",
                "Tackle_Success_Rate": "57.1%"
            },
            "home": {
                "Tackles": "20",
                "Clearances": "17",
                "Tackle_Success_Rate": "65.0%"
            }
        },
        "GENERAL_STATS": {
            "away": {
                "Offsides": "3",
                "Possession": "51.4%",
                "Corners_Won": "7",
                "Interceptions": "9",
                "Ariel_Duels_Won": "31.6%",
                "Duels_Success_Rate": "47.7%"
            },
            "home": {
                "Offsides": "0",
                "Possession": "48.6%",
                "Corners_Won": "8",
                "Interceptions": "7",
                "Ariel_Duels_Won": "68.4%",
                "Duels_Success_Rate": "52.3%"
            }
        },
        "DISCIPLINE_STATS": {
            "away": {
                "Red_Cards": "0",
                "Yellow_Cards": "0",
                "Fouls_Conceded": "9"
            },
            "home": {
                "Red_Cards": "0",
                "Yellow_Cards": "2",
                "Fouls_Conceded": "12"
            }
        },
        "DISTRIBUTION_STATS": {
            "away": {
                "Passes": "459",
                "Crosses": "20",
                "Long_Passes": "68",
                "Passing_Accuracy": "81.0%",
                "Crossing_Accuracy": "30.0%",
                "Passing_Accuracy_In_Opponent_Half": "70.3%"
            },
            "home": {
                "Passes": "434",
                "Crosses": "16",
                "Long_Passes": "74",
                "Passing_Accuracy": "79.0%",
                "Crossing_Accuracy": "37.5%",
                "Passing_Accuracy_In_Opponent_Half": "73.1%"
            }
        }
    }
},
{
    "id": 2,
    "date": new Date as Date,
    "season": "2023",
    "homeTeamId": 3,
    "awayTeamId": 4,
    "homeTeamUslId": 8,
    "awayTeamUslId": 14,
    "score": "0-1",
    "stats": {
        "ATTACK_STATS": {
            "away": {
                "Goals": "1",
                "Shots": "10",
                "Blocked_Shots": "1",
                "Shots_On_Target": "3",
                "Shots_Inside_Box": "7",
                "Shooting_Accuracy": "30.0%",
                "Shots_Outside_Box": "3"
            },
            "home": {
                "Goals": "0",
                "Shots": "11",
                "Blocked_Shots": "1",
                "Shots_On_Target": "6",
                "Shots_Inside_Box": "5",
                "Shooting_Accuracy": "54.5%",
                "Shots_Outside_Box": "6"
            }
        },
        "DEFENSE_STATS": {
            "away": {
                "Tackles": "18",
                "Clearances": "17",
                "Tackle_Success_Rate": "61.1%"
            },
            "home": {
                "Tackles": "8",
                "Clearances": "9",
                "Tackle_Success_Rate": "87.5%"
            }
        },
        "GENERAL_STATS": {
            "away": {
                "Offsides": "1",
                "Possession": "50.6%",
                "Corners_Won": "2",
                "Interceptions": "11",
                "Ariel_Duels_Won": "48.5%",
                "Duels_Success_Rate": "50.0%"
            },
            "home": {
                "Offsides": "0",
                "Possession": "49.4%",
                "Corners_Won": "6",
                "Interceptions": "12",
                "Ariel_Duels_Won": "51.5%",
                "Duels_Success_Rate": "50.0%"
            }
        },
        "DISCIPLINE_STATS": {
            "away": {
                "Red_Cards": "1",
                "Yellow_Cards": "4",
                "Fouls_Conceded": "20"
            },
            "home": {
                "Red_Cards": "0",
                "Yellow_Cards": "3",
                "Fouls_Conceded": "17"
            }
        },
        "DISTRIBUTION_STATS": {
            "away": {
                "Passes": "348",
                "Crosses": "8",
                "Long_Passes": "80",
                "Passing_Accuracy": "67.0%",
                "Crossing_Accuracy": "12.5%",
                "Passing_Accuracy_In_Opponent_Half": "57.5%"
            },
            "home": {
                "Passes": "334",
                "Crosses": "15",
                "Long_Passes": "83",
                "Passing_Accuracy": "65.9%",
                "Crossing_Accuracy": "33.3%",
                "Passing_Accuracy_In_Opponent_Half": "51.2%"
            }
        }
    }
},
]

describe('MatchesService', () => {
  let service: MatchesService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [MatchesService, PrismaService],
    }).compile();

    service = module.get<MatchesService>(MatchesService);
    prismaService = module.get<PrismaService>(PrismaService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

 /*  describe('findAll', () => {
    it('should return an array of matches', async () => {

      jest.spyOn(prismaService.match, 'findMany').mockResolvedValueOnce(mockMatches);

      const result = await service.findAll();

      expect(result).toEqual(mockMatches);
    });
  });
 */
  describe('findOne', () => {
    it('should return a match by ID', async () => {
      const matchId = 1;

      jest.spyOn(prismaService.match, 'findUnique').mockResolvedValueOnce(mockMatches[0]);

      const result = await service.findOne(matchId);

      expect(result).toEqual(mockMatches[0]);
    });

    it('should return null if match is not found', async () => {
      const matchId = 999; // An ID that doesn't exist

      jest.spyOn(prismaService.match, 'findUnique').mockResolvedValueOnce(null);

      const result = await service.findOne(matchId);

      expect(result).toBeNull();
    });
  });

  describe('findByTeam', () => {
    /* it('should return matches by team ID', async () => {
      const teamId = 1;

      jest.spyOn(prismaService.match, 'findMany').mockResolvedValueOnce(mockMatches);

      const result = await service.findByTeam(teamId);

      expect(result).toEqual([mockMatches[0]]);
    }); */

    it('should return an empty array if no matches are found for the team', async () => {
      const teamId = 999; // An ID for a team with no matches

      jest.spyOn(prismaService.match, 'findMany').mockResolvedValueOnce([]);

      const result = await service.findByTeam(teamId);

      expect(result).toEqual([]);
    });
  });
});