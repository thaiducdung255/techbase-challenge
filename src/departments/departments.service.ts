import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Department } from './schema/departments.schema';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PaginationOption } from '../common/dto/common.pagination-option.dto';

@Injectable()
export class DepartmentsService {
	constructor(@InjectModel(Department.name) private departmentModel: Model<Department>) {}

	async list(paginationOption: PaginationOption): Promise<Department[]> {
		try {
			return this.departmentModel.find().skip(paginationOption.skip).limit(paginationOption.limit);
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async createOne(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
		try {
			const newDepartment: Department = new this.departmentModel(createDepartmentDto);
			await newDepartment.save();
			return newDepartment;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async updateOne(departmentId: string, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
		try {
			const updatedDept: Department = await this.departmentModel.findByIdAndUpdate(
				departmentId,
				{
					$set: updateDepartmentDto,
				},
				{
					new: true,
				},
			);

			if (!updatedDept) throw new NotFoundException(`Department #${departmentId} not found`);

			return updatedDept;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async deleteOne(departmentId: string): Promise<Department> {
		try {
			const deletedDept: Department = await this.departmentModel.findByIdAndDelete(departmentId);

			if (!deletedDept) throw new NotFoundException(`Department #${departmentId} not found`);

			return deletedDept;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async getOne(departmentId: string): Promise<Department> {
		try {
			const selectedDept: Department = await this.departmentModel.findById(departmentId);

			if (!selectedDept) throw new NotFoundException(`Department #${departmentId} not found`);

			return selectedDept;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}
}
