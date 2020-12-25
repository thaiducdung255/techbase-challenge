import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Department } from './schema/departments.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department.name) private departmentModel: Model<Department>,
  ) {}

  async list(): Promise<Department[]> {
    return this.departmentModel.find();
  }
}
