/* eslint-disable prettier/prettier */
import { IsBoolean, IsDateString, IsNumber, IsString } from 'class-validator';
import { Role } from 'src/user-role/role.enum';

export class UserDTO {
  @IsNumber()
  id: number;
  
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  email: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsDateString()
  date_created: Date;

  roles: Role[];
}

export class UserLoginDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;
}  