import { Controller, Get } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from './schema/teams.schema';

@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Get()
  list(): Promise<Team[]> {
    return this.teamsService.list();
  }
}
