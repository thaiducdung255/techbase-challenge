import { Team } from '../../teams/schema/teams.schema';

export class UpdateEmployeeDto {
	teams: Team[];
	role: string;
}
