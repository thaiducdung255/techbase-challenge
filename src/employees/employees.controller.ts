import { Body, Param, Controller, Get, HttpCode, Patch, Post, Delete, UseGuards, Query } from '@nestjs/common';

import { EmployeesService } from './employees.service';
import { Employee } from './schema/employees.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { TokensGuard } from 'src/tokens.guard';
import { PaginationOption } from '../common/dto/common.pagination-option.dto';

@Controller('employees')
export class EmployeesController {
	constructor(private employeeService: EmployeesService) {}

	@Get()
	@UseGuards(new TokensGuard())
	list(@Query() paginationOption: PaginationOption): Promise<Employee[]> {
		return this.employeeService.list(paginationOption);
	}

	@Get('/:id')
	@UseGuards(new TokensGuard())
	getOne(@Param('id') employeeId: string): Promise<Employee> {
		return this.employeeService.getOne(employeeId);
	}

	@Post()
	@UseGuards(new TokensGuard())
	@HttpCode(201)
	createOne(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
		return this.employeeService.createOne(createEmployeeDto);
	}

	@Patch('/:id')
	@UseGuards(new TokensGuard())
	updateOne(@Param('id') employeeId: string, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
		return this.employeeService.updateOne(employeeId, updateEmployeeDto);
	}

	@Delete('/:id')
	@UseGuards(new TokensGuard())
	deleteOne(@Param('id') employeeId: string): Promise<Employee> {
		return this.employeeService.deleteOne(employeeId);
	}
}
