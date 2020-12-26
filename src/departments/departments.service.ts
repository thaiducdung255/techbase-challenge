import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Department } from './schema/departments.schema';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
	constructor(@InjectModel(Department.name) private departmentModel: Model<Department>) {}

	async list(): Promise<Department[]> {
		try {
			return this.departmentModel.find();
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async createOne(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
		try {
			const newDepartment = new this.departmentModel(createDepartmentDto);
			await newDepartment.save();
			return newDepartment;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async updateOne(departmentId: string, updateDepartmentDto: UpdateDepartmentDto): Promise<boolean> {
		try {
			await this.departmentModel.updateOne(
				{
					_id: departmentId,
				},
				{
					$set: updateDepartmentDto,
				},
			);
			return true;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async deleteOne(departmentId: string): Promise<boolean> {
		try {
			await this.departmentModel.deleteOne({ _id: departmentId });
			return true;
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}

	async getOne(departmentId: string): Promise<Department> {
		try {
			return this.departmentModel.findOne({ _id: departmentId });
		} catch (err) {
			throw new InternalServerErrorException(err.toString());
		}
	}
}
