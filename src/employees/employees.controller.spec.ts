import { Test, TestingModule } from '@nestjs/testing';
import { name, random } from 'faker';
import { MongooseModule } from '@nestjs/mongoose';

import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Employee, EmployeeSchema } from './schema/employees.schema';

describe('employeesController', () => {
	let employeesController: EmployeesController;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [EmployeesController],
			providers: [EmployeesService],
			imports: [
				MongooseModule.forFeature([
					{
						name: Employee.name,
						schema: EmployeeSchema,
					},
				]),
			],
		}).compile();

		employeesController = moduleRef.get<EmployeesController>(EmployeesController);
	});

	describe('get all employees', async () => {
		const randomEmployees: Employee[] = [];
		for (let i = 0; i < 10; i++) {
			const randomteam = await employeesController.createOne({
				username: name.findName(),
				password: random.uuid(),
			});

			randomEmployees.push(randomteam);
		}

		it('should return an array of 10 employees', () => {
			const testListEmployee = expect(employeesController.list({ skip: 0, limit: 10 }));

			testListEmployee.toHaveLength(10);
			testListEmployee.toBe(randomEmployees);
		});
	});

	describe('get one employee by id', async () => {
		const newEmployee: Employee = await employeesController.createOne({
			username: name.findName(),
			password: random.uuid(),
		});

		it('should return a employee', () => {
			const testGetOneEmployee = expect(employeesController.getOne(newEmployee.id));

			testGetOneEmployee.toBe(newEmployee);
		});
	});

	describe('update one employee by id', async () => {
		const newEmployee: Employee = await employeesController.createOne({
			username: name.findName(),
			password: random.uuid(),
		});

		it('should return an updated employee', () => {
			const updatedRole = random.uuid();
			const testUpdateOneEmployee = expect(employeesController.updateOne(newEmployee.id, { role: updatedRole }));

			testUpdateOneEmployee.toBe({ ...newEmployee, role: updatedRole });
		});
	});

	describe('delete one employee by id', async () => {
		const newEmployee: Employee = await employeesController.createOne({
			username: name.findName(),
			password: random.uuid(),
		});

		it('should return a employee but it is not in the database', () => {
			const testDeleteOneEmployee = expect(employeesController.deleteOne(newEmployee.id));
			const testGetOneEmployee = expect(employeesController.getOne(newEmployee.id));

			testDeleteOneEmployee.toBe(newEmployee);
			testGetOneEmployee.toBeNull();
		});
	});
});
