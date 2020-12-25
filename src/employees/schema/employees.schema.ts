import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Team } from '../../teams/schema/teams.schema';

@Schema()
export class Employee extends mongoose.Document {
	@Prop({
		required: true,
		index: true,
		lowercase: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Team',
	})
	teams: Team[];

	@Prop({
		required: true,
		unique: true,
		index: true,
		immutable: true,
		lowercase: true,
	})
	username: string;

	@Prop({
		required: true,
	})
	password: string;

	@Prop({
		required: true,
	})
	salt: string;

	@Prop({
		required: true,
		index: true,
		enum: ['member', 'manager', 'director'],
		default: 'member',
	})
	role: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
