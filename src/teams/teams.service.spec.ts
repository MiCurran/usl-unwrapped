import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from './teams.service';
import { PrismaModule } from '../prisma/prisma.module';
import {mockTeams} from './teams.mock'

describe('teamsService', () => {
  let service: TeamsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [TeamsService],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a uslTeam by ID', async () => {
      const matchId = 1;
      const expectedTeam = mockTeams[0];

      const result = await service.findOne(matchId);

      expect(result).toEqual(expectedTeam);
    });

    it('should return null if team is not found', async () => {
      const uslTeamsId = 99999; // An ID that doesn't exist


      const result = await service.findOne(uslTeamsId);

      expect(result).toBeNull();
    });
  });

})