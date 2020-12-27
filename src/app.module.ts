import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamModule } from './teams/teams.module';
import { DepartmentModule } from './departments/departments.module';
import { EmployeeModule } from './employees/employees.module';

const mongoConfigs = {
	useCreateIndex: true,
	useFindAndModify: false,
};

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
			isGlobal: true,
		}),
		MongooseModule.forRoot('mongodb://localhost:27017/test', mongoConfigs),
		TeamModule,
		DepartmentModule,
		EmployeeModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
