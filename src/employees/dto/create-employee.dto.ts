export class CreateEmployeeDto {
	teams?: string[];
	username: string;
	password: string;
	salt?: string;
	role?: string;
}
