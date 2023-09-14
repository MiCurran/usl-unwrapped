import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from './teams.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import {mockTeams} from './teams.mock'

describe('teamsService', () => {
  let service: TeamsService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [TeamsService, PrismaService],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
    prismaService = module.get<PrismaService>(PrismaService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a uslTeam by ID', async () => {
      const matchId = 1;
      const expectedTeam = mockTeams[0];
      jest.spyOn(prismaService.uslTeams, 'findUnique').mockResolvedValueOnce(expectedTeam);

      const result = await service.findOne(matchId);

      expect(result).toEqual(expectedTeam);
    });

    it('should return null if team is not found', async () => {
      const uslTeamsId = 99999; // An ID that doesn't exist

      jest.spyOn(prismaService.uslTeams, 'findUnique').mockResolvedValueOnce(null);

      const result = await service.findOne(uslTeamsId);

      expect(result).toBeNull();
    });
  });

})