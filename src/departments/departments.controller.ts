import { Body, Param, Controller, Get, HttpCode, Patch, Post, Delete, UseGuards, Query } from '@nestjs/common';

import { DepartmentsService } from './departments.service';
import { Department } from './schema/departments.schema';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
/* import { TokensGuard } from 'src/tokens.guard'; */
import { PaginationOption } from '../common/dto/common.pagination-option.dto';

@Controller('departments')
/* @UseGuards(new TokensGuard()) */
export class DepartmentsController {
	constructor(private departmentsService: DepartmentsService) {}

	@Get()
	list(@Query() paginationOption: PaginationOption): Promise<Department[]> {
		return this.departmentsService.list(paginationOption);
	}

	@Get('/:id')
	getOne(@Param('id') departmentId: string): Promise<Department> {
		return this.departmentsService.getOne(departmentId);
	}

	@Post()
	@HttpCode(201)
	createOne(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
		return this.departmentsService.createOne(createDepartmentDto);
	}

	@Patch('/:id')
	updateOne(@Param('id') departmentId: string, @Body() updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
		return this.departmentsService.updateOne(departmentId, updateDepartmentDto);
	}

	@Delete('/:id')
	deleteOne(@Param('id') departmentId: string): Promise<Department> {
		return this.departmentsService.deleteOne(departmentId);
	}
}
