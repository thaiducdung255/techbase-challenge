import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Department extends Document {
	@Prop({
		required: true,
		unique: true,
		index: true,
		maxlength: 25,
		minlength: 3,
	})
	name: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
