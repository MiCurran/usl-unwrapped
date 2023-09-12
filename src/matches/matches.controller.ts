import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { MatchesService } from './matches.service';
import { Match, Prisma } from '.prisma/client';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  create(@Body() data: Prisma.MatchCreateInput): Promise<Match> {
    return this.matchesService.create(data);
  }

  @Get()
  findAll(): Promise<Match[]> {
    return this.matchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Match | null> {
    return this.matchesService.findOne(+id);
  }

  @Get('by-team/:teamId')
findByTeam(@Param('teamId') teamId: string): Promise<Match[]> {
  return this.matchesService.findByTeam(+teamId);
}

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.MatchUpdateInput,
  ): Promise<Match> {
    return this.matchesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.matchesService.remove(+id);
  }
}
