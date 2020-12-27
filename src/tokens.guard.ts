import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
/* import { ConfigService } from '@nestjs/config'; */
/* import { verify } from 'jsonwebtoken'; */
/* import { InjectModel } from '@nestjs/mongoose'; */
/* import { Model } from 'mongoose'; */

/* import { Employee } from './employees/schema/employees.schema'; */

@Injectable()
export class TokensGuard implements CanActivate {
	/* constructor( */
	/* 	private configService: ConfigService, */
	/* 	@InjectModel(Employee.name) private employeeModel: Model<Employee>, */
	/* ) {} */

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		/* 	const tokenSecret = this.configService.get<string>('jwt.secretKey'); */
		/* 	const request = context.switchToHttp().getRequest(); */
		/* 	const { accessToken } = request.headers; */

		/* 	if (!accessToken) throw new UnauthorizedException(); */

		/* 	const data = verify(accessToken, tokenSecret); */
		return true;
	}
}
