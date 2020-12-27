import { Test, TestingModule } from '@nestjs/testing';
import { name } from 'faker';
import { MongooseModule } from '@nestjs/mongoose';

import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { Department, DepartmentSchema } from './schema/departments.schema';

describe('DepartmentsController', () => {
	let departmentsController: DepartmentsController;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [DepartmentsController],
			providers: [DepartmentsService],
			imports: [
				MongooseModule.forFeature([
					{
						name: Department.name,
						schema: DepartmentSchema,
					},
				]),
			],
		}).compile();

		departmentsController = moduleRef.get<DepartmentsController>(DepartmentsController);
	});

	describe('get all departments', async () => {
		const randomDepartments: Department[] = [];
		for (let i = 0; i < 10; i++) {
			const randomDepartment = await departmentsController.createOne({
				name: name.findName(),
			});

			randomDepartments.push(randomDepartment);
		}

		it('should return an array of 10 departments', () => {
			const testListDepartment = expect(departmentsController.list({ skip: 0, limit: 10 }));

			testListDepartment.toHaveLength(10);
			testListDepartment.toBe(randomDepartments);
		});
	});

	describe('get one department by id', async () => {
		const newDepartment: Department = await departmentsController.createOne({
			name: name.findName(),
		});

		it('should return a department', () => {
			const testGetOneDepartment = expect(departmentsController.getOne(newDepartment.id));

			testGetOneDepartment.toBe(newDepartment);
		});
	});

	describe('update one department by id', async () => {
		const newDepartment: Department = await departmentsController.createOne({
			name: name.findName(),
		});

		it('should return an updated department', () => {
			const updatedName = name.findName();
			const testUpdateOneDepartment = expect(
				departmentsController.updateOne(newDepartment.id, { name: name.findName() }),
			);

			testUpdateOneDepartment.toBe({ ...newDepartment, name: updatedName });
		});
	});

	describe('delete one department by id', async () => {
		const newDepartment: Department = await departmentsController.createOne({
			name: name.findName(),
		});

		it('should return a department but it is not in the database', () => {
			const testDeleteOneDepartment = expect(departmentsController.deleteOne(newDepartment.id));
			const testGetOneDepartment = expect(departmentsController.getOne(newDepartment.id));

			testDeleteOneDepartment.toBe(newDepartment);
			testGetOneDepartment.toBeNull();
		});
	});
});
