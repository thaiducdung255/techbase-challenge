import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Department } from '../../departments/schema/departments.schema';
import { Employee } from '../../employees/schema/employees.schema';

@Schema()
export class Team extends mongoose.Document {
	@Prop({
		required: true,
		unique: true,
		index: true,
	})
	name: string;

	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Department',
	})
	department: Department;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Employee',
	})
	members: Employee[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
