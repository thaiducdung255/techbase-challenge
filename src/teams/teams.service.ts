import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Team } from './schema/teams.schema';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PaginationOption } from '../common/dto/common.pagination-option.dto';

@Injectable()
export class TeamsService {
	constructor(@InjectModel(Team.name) private teamModel: Model<Team>) {}

	async list(paginationOption: PaginationOption): Promise<Team[]> {
		try {
			return this.teamModel.find().populate('department').skip(paginationOption.skip).limit(paginationOption.limit);
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async createOne(createTeamDto: CreateTeamDto): Promise<Team> {
		try {
			const newTeam: Team = new this.teamModel(createTeamDto);
			await newTeam.save();
			return newTeam;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async updateOne(teamId: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
		try {
			const updatedTeam: Team = await this.teamModel.findByIdAndUpdate(
				teamId,
				{
					$set: updateTeamDto,
				},
				{
					new: true,
				},
			);

			if (!updatedTeam) throw new NotFoundException(`Team #${teamId} not found`);

			return updatedTeam;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async deleteOne(teamId: string): Promise<Team> {
		try {
			const deletedTeam: Team = await this.teamModel.findByIdAndDelete(teamId);

			if (!deletedTeam) throw new NotFoundException(`Team #${teamId} not found`);

			return deletedTeam;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async getOne(teamId: string): Promise<Team> {
		try {
			const selectedTeam: Team = await this.teamModel.findById(teamId).populate('department');

			if (!selectedTeam) throw new NotFoundException(`Team #${teamId} not found`);

			return selectedTeam;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}
}
