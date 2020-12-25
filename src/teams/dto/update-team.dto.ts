import { Department } from '../../departments/schema/departments.schema';
import { Employee } from '../../employees/schema/employees.schema';

export class UpdateTeamDto {
	name: string;
	department: Department;
	members: Employee[];
}
