import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './schema/employees.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeesService {
	constructor(@InjectModel(Employee.name) private employeeModel: Model<Employee>) {}

	async list(): Promise<Employee[]> {
		return this.employeeModel.find();
	}
}
