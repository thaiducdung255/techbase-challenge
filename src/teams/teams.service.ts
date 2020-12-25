import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from './schema/teams.schema';
import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamsService {
	constructor(@InjectModel(Team.name) private teamModel: Model<Team>) {}

	async list(): Promise<Team[]> {
		return this.teamModel.find();
	}

	async createOne(createTeamDto: CreateTeamDto): Promise<Team> {
		const newTeam: Team = new this.teamModel(createTeamDto);
		await newTeam.save();
		return newTeam;
	}
}
