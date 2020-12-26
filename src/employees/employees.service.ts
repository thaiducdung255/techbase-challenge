import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './schema/employees.schema';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
	constructor(@InjectModel(Employee.name) private employeeModel: Model<Employee>) {}

	async list(): Promise<Employee[]> {
		try {
			return this.employeeModel.find();
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async createOne(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
		try {
			const newEmployee = new this.employeeModel(createEmployeeDto);
			await newEmployee.save();
			return newEmployee;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async updateOne(employeeId: string, updateEmployeeDto: UpdateEmployeeDto): Promise<boolean> {
		try {
			await this.employeeModel.updateOne(
				{
					_id: employeeId,
				},
				{
					$set: updateEmployeeDto,
				},
			);
			return true;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async deleteOne(employeeId: string): Promise<boolean> {
		try {
			await this.employeeModel.deleteOne({ _id: employeeId });
			return true;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async getOne(employeeId: string): Promise<Employee> {
		try {
			return this.employeeModel.findOne({ _id: employeeId });
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}
}
