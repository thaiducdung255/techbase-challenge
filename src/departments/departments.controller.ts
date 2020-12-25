import { Controller, Get } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department } from './schema/departments.schema';

@Controller('departments')
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  @Get()
  list(): Promise<Department[]> {
    return this.departmentsService.list();
  }
}
