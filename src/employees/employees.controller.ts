import { Controller, Get } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './schema/employees.schema';

@Controller('employees')
export class EmployeesController {
	constructor(private employeesService: EmployeesService) {}

	@Get()
	list(): Promise<Employee[]> {
		return this.employeesService.list();
	}
}
