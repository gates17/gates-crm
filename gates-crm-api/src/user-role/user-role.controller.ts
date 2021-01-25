import { UserRoleService } from './user-role.service';
// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Patch, Delete, Body, Param, HttpStatus, HttpException, UsePipes, Logger } from '@nestjs/common';

import { ValidationPipe } from '../shared/validation.pipe';
import { UserRoleDTO } from './user-role.dto';

@Controller('user-role')
export class UserRoleController {
  private logger = new Logger('UserRoleController');
  constructor(private roleService: UserRoleService) {}

  @Get()
  async getAllRoles() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.roleService.showAll(),
    };
  }

  @Get(':id')
  async getRoleId(@Param('id') id: number) {
    const data = await this.roleService.findById(id);
    return {
      statusCode: HttpStatus.OK,
      data: data,
    };
  }

  @Get('role/:user')
  async getRoleName(@Param('user') user: string) {
    const data = await this.roleService.findByName(user);
    return {
      statusCode: HttpStatus.OK,
      data: data,
    };
  }
  @Post()
  @UsePipes(new ValidationPipe())
  async createRole(@Body() data: UserRoleDTO) {
    const today = new Date();
    this.logger.log(today);
    this.logger.log(JSON.stringify(data));
    return {
      statusCode: HttpStatus.OK,
      message: 'Role added successfully',
      data: await this.roleService.create(data),
    };
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateRole(
    @Param('id') id: number,
    @Body() data: Partial<UserRoleDTO>,
  ) {
    this.logger.log(JSON.stringify(data));

    return {
      statusCode: HttpStatus.OK,
      message: 'Role update successfully',
      data: await this.roleService.update(id, data),
    };
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: number) {
    await this.roleService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Role deleted successfully',
    };
  }
}
