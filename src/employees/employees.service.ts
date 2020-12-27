import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes, pbkdf2Sync } from 'crypto';

import { Employee } from './schema/employees.schema';
import { PaginationOption } from '../common/dto/common.pagination-option.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
	constructor(
		@InjectModel(Employee.name) private employeeModel: Model<Employee>,
		private configService: ConfigService,
	) {}

	async list(paginationOption: PaginationOption): Promise<Employee[]> {
		try {
			return this.employeeModel.find().skip(paginationOption.skip).limit(paginationOption.limit);
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async createOne(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
		try {
			const { salt, password } = this.createPassword(createEmployeeDto.password);
			createEmployeeDto.password = password;
			createEmployeeDto.salt = salt;
			const newEmployee = new this.employeeModel(createEmployeeDto);
			await newEmployee.save();
			return newEmployee;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async updateOne(employeeId: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
		try {
			const updatedUser: Employee = await this.employeeModel.findByIdAndUpdate(
				employeeId,
				{
					$set: updateEmployeeDto,
				},
				{
					new: true,
				},
			);

			if (updatedUser) throw new NotFoundException(`Employee #${employeeId} not found`);
			return updatedUser;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async deleteOne(employeeId: string): Promise<Employee> {
		try {
			const deletedUser: Employee = await this.employeeModel.findByIdAndDelete(employeeId);

			if (!deletedUser) throw new NotFoundException(`Employee #${employeeId} not found`);
			return deletedUser;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async getOne(employeeId: string): Promise<Employee> {
		try {
			const selectedEmployee: Employee = await this.employeeModel.findById(employeeId);

			if (!selectedEmployee) throw new NotFoundException(`Employee #${employeeId} not found`);
			return selectedEmployee;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async login(username: string, rawPassword: string): Promise<{ accessToken: string; refreshToken: string }> {
		const selectedEmployee = await this.employeeModel.findOne({ username });

		if (!selectedEmployee) throw new NotFoundException(`Username #${username} not found`);

		const isPasswordMatch = this.comparePassword(rawPassword, selectedEmployee.salt, selectedEmployee.password);

		if (!isPasswordMatch) throw new Error('Wrong username or password');

		return { accessToken: '', refreshToken: '' };
	}

	createPassword(rawPassword: string): { salt: string; password: string } {
		const salt: string = randomBytes(25).toString('hex');
		const password: string = this.hashPassword(rawPassword, salt);
		return { salt, password };
	}

	hashPassword(rawPassword: string, salt: string): string {
		const saltRound: number = this.configService.get<number>('crypt.saltRound');
		const passwordLen: number = this.configService.get<number>('crypt.passwordLen');
		const algorithm: string = this.configService.get<string>('crypt.algorithm');
		const pepper: string = this.configService.get<string>('crypt.pepper');
		const saltedPassword: string = pbkdf2Sync(rawPassword, salt, saltRound, passwordLen, algorithm).toString('hex');
		const password: string = pbkdf2Sync(saltedPassword, pepper, saltRound, passwordLen, algorithm).toString('hex');
		return password;
	}

	comparePassword(rawPassword: string, salt: string, hashedPassword: string): boolean {
		const testedPassword: string = this.hashPassword(rawPassword, salt);
		return testedPassword === hashedPassword;
	}
}
