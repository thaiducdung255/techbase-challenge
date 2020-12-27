import { Test, TestingModule } from '@nestjs/testing';
import { name } from 'faker';
import { MongooseModule } from '@nestjs/mongoose';

import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { Team, TeamSchema } from './schema/teams.schema';

describe('teamsController', () => {
	let teamsController: TeamsController;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [TeamsController],
			providers: [TeamsService],
			imports: [
				MongooseModule.forFeature([
					{
						name: Team.name,
						schema: TeamSchema,
					},
				]),
			],
		}).compile();

		teamsController = moduleRef.get<TeamsController>(TeamsController);
	});

	describe('get all teams', async () => {
		const randomTeams: Team[] = [];
		for (let i = 0; i < 10; i++) {
			const randomteam = await teamsController.createOne({
				name: name.findName(),
			});

			randomTeams.push(randomteam);
		}

		it('should return an array of 10 teams', () => {
			const testListTeam = expect(teamsController.list({ skip: 0, limit: 10 }));

			testListTeam.toHaveLength(10);
			testListTeam.toBe(randomTeams);
		});
	});

	describe('get one team by id', async () => {
		const newTeam: Team = await teamsController.createOne({
			name: name.findName(),
		});

		it('should return a team', () => {
			const testGetOneTeam = expect(teamsController.getOne(newTeam.id));

			testGetOneTeam.toBe(newTeam);
		});
	});

	describe('update one team by id', async () => {
		const newTeam: Team = await teamsController.createOne({
			name: name.findName(),
		});

		it('should return an updated team', () => {
			const updatedName = name.findName();
			const testUpdateOneTeam = expect(teamsController.updateOne(newTeam.id, { name: name.findName() }));

			testUpdateOneTeam.toBe({ ...newTeam, name: updatedName });
		});
	});

	describe('delete one team by id', async () => {
		const newTeam: Team = await teamsController.createOne({
			name: name.findName(),
		});

		it('should return a team but it is not in the database', () => {
			const testDeleteOneTeam = expect(teamsController.deleteOne(newTeam.id));
			const testGetOneTeam = expect(teamsController.getOne(newTeam.id));

			testDeleteOneTeam.toBe(newTeam);
			testGetOneTeam.toBeNull();
		});
	});
});
