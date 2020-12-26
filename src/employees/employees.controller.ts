import { Body, Param, Controller, Get, HttpCode, Patch, Post, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './schema/employees.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
	constructor(private employeeService: EmployeesService) {}

	@Get()
	list(): Promise<Employee[]> {
		return this.employeeService.list();
	}

	@Get('/:id')
	getOne(@Param('id') employeeId: string): Promise<Employee> {
		return this.employeeService.getOne(employeeId);
	}

	@Post()
	@HttpCode(201)
	createOne(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
		return this.employeeService.createOne(createEmployeeDto);
	}

	@Patch('/:id')
	updateOne(@Param('id') employeeId: string, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<boolean> {
		return this.employeeService.updateOne(employeeId, updateEmployeeDto);
	}

	@Delete('/:id')
	deleteOne(@Param('id') employeeId: string): Promise<boolean> {
		return this.employeeService.deleteOne(employeeId);
	}
}
