/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator';

export class UserRoleDTO {

  id: number;
  
  @IsString()
  role: string;

}  