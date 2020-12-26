import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from './schema/teams.schema';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
	constructor(@InjectModel(Team.name) private teamModel: Model<Team>) {}

	async list(): Promise<Team[]> {
		try {
			return this.teamModel.find();
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async createOne(createTeamDto: CreateTeamDto): Promise<Team> {
		try {
			const newTeam = new this.teamModel(createTeamDto);
			await newTeam.save();
			return newTeam;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async updateOne(teamId: string, updateTeamDto: UpdateTeamDto): Promise<boolean> {
		try {
			await this.teamModel.updateOne(
				{
					_id: teamId,
				},
				{
					$set: updateTeamDto,
				},
			);
			return true;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async deleteOne(teamId: string): Promise<boolean> {
		try {
			await this.teamModel.deleteOne({ _id: teamId });
			return true;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async getOne(teamId: string): Promise<Team> {
		try {
			return this.teamModel.findOne({ _id: teamId });
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}
}
