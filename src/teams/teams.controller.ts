import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from './schema/teams.schema';
import { CreateTeamDto } from './dto/create-team.dto';

@Controller('teams')
export class TeamsController {
	constructor(private teamsService: TeamsService) {}

	@Get()
	list(): Promise<Team[]> {
		return this.teamsService.list();
	}

	@Post()
	@HttpCode(201)
	async createOne(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
		return this.teamsService.createOne(createTeamDto);
	}
}
