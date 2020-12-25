import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Employee, EmployeeSchema } from './schema/employees.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Employee.name,
				schema: EmployeeSchema,
			},
		]),
	],
	controllers: [EmployeesController],
	providers: [EmployeesService],
})
export class EmployeeModule {}
