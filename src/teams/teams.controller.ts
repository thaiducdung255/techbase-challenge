import { Body, Param, Controller, Get, HttpCode, Patch, Post, Delete } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from './schema/teams.schema';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('teams')
export class TeamsController {
	constructor(private teamService: TeamsService) {}

	@Get()
	list(): Promise<Team[]> {
		return this.teamService.list();
	}

	@Get('/:id')
	getOne(@Param('id') teamId: string): Promise<Team> {
		return this.teamService.getOne(teamId);
	}

	@Post()
	@HttpCode(201)
	createOne(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
		return this.teamService.createOne(createTeamDto);
	}

	@Patch('/:id')
	updateOne(@Param('id') teamId: string, @Body() updateTeamDto: UpdateTeamDto): Promise<boolean> {
		return this.teamService.updateOne(teamId, updateTeamDto);
	}

	@Delete('/:id')
	deleteOne(@Param('id') teamId: string): Promise<boolean> {
		return this.teamService.deleteOne(teamId);
	}
}
