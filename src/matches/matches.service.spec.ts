import { Test, TestingModule } from '@nestjs/testing';
import { MatchesService } from './matches.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import {mockMatches} from './matches.mock'

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

  describe('findOne', () => {
    it('should return a match by ID', async () => {
      const matchId = 1;
      const expectedMatch = mockMatches[0];
      jest.spyOn(prismaService.match, 'findUnique').mockResolvedValueOnce(expectedMatch);

      const result = await service.findOne(matchId);

      expect(result).toEqual({...expectedMatch, date: expectedMatch.date,});
    });

    it('should return null if match is not found', async () => {
      const matchId = 99999; // An ID that doesn't exist

      jest.spyOn(prismaService.match, 'findUnique').mockResolvedValueOnce(null);

      const result = await service.findOne(matchId);

      expect(result).toBeNull();
    });
  });

  describe('findByTeam', () => {
    it('should return matches by team ID', async () => {
      const teamId = 1;

      jest.spyOn(prismaService.match, 'findMany').mockResolvedValueOnce(mockMatches);

      const result = await service.findByTeam(teamId);

      expect([result[0]]).toEqual([mockMatches[2]]);
    });

    it('should return an empty array if no matches are found for the team', async () => {
      const teamId = 30; // An ID for a team with no matches

      jest.spyOn(prismaService.match, 'findMany').mockResolvedValueOnce([]);

      const result = await service.findByTeam(teamId);

      expect(result).toEqual([]);
    });
  });
});