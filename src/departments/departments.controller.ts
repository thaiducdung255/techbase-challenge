import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department } from './schema/departments.schema';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('departments')
export class DepartmentsController {
	constructor(private departmentsService: DepartmentsService) {}

	@Get()
	list(): Promise<Department[]> {
		return this.departmentsService.list();
	}

	@Post()
	@HttpCode(201)
	createOne(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
		return this.departmentsService.createOne(createDepartmentDto);
	}
}
