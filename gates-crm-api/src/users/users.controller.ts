import { UserLoginDTO, UserDTO } from './users.dto';
// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Patch, Delete, Body, Param, HttpStatus, HttpException, UsePipes, Logger } from '@nestjs/common';

import { UsersService } from './users.service';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller('users')
export class UsersController {
  private logger = new Logger('UsersController');
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.usersService.showAll(),
    };
  }

  @Get(':id')
  async getUserId(@Param('id') id: number) {
    const data = await this.usersService.findById(id);
    return {
      statusCode: HttpStatus.OK,
      data: data,
    };
  }

  @Get('user/:user')
  async getUserEmail(@Param('user') user: string) {
    const data = await this.usersService.findByEmail(user);
    return {
      statusCode: HttpStatus.OK,
      data: data,
    };
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() data: UserDTO) {
    const today = new Date();
    this.logger.log(today);
    this.logger.log(JSON.stringify(data));
    return {
      statusCode: HttpStatus.OK,
      message: 'User added successfully',
      data: await this.usersService.create(data),
    };
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateUser(@Param('id') id: number, @Body() data: Partial<UserDTO>) {
    this.logger.log(JSON.stringify(data));

    return {
      statusCode: HttpStatus.OK,
      message: 'User update successfully',
      data: await this.usersService.update(id, data),
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.usersService.destroy(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async registerUser(@Body() data: UserDTO) {
    const today = new Date();
    this.logger.log(today);
    this.logger.log(JSON.stringify(data));
    return {
      statusCode: HttpStatus.OK,
      message: 'User registered successfully',
      data: await this.usersService.create(data),
    };
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async loginUser(@Body() data: UserLoginDTO) {
    const today = new Date();
    this.logger.log(today);
    this.logger.log(JSON.stringify(data));
    return {
      statusCode: HttpStatus.OK,
      message: 'User logged in successfully',
      data: await this.usersService.login(data),
    };
  }
}
