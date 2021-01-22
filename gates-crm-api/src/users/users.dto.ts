/* eslint-disable prettier/prettier */
import { IsBoolean, IsDateString, IsString } from 'class-validator';

export class UserDTO {
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
}

export class UserLoginDTO {
    @IsString()
    username: string;
  
    @IsString()
    password: string;
}  