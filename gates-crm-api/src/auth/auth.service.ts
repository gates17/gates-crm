import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserLoginDTO, UserDTO } from './../users/users.dto';

import { UsersEntity } from './../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: UserLoginDTO): Promise<any> {
    Logger.log('user validation' + data, 'AUTHSERVICE');
    const { username, password } = data;
    const user = await this.usersService.login(data);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    user.userId = user.id; // o que é o userId
    const payload = {
      username: user.username,
      sub: user.userId,
      role: user.role_id,
    };
    const access_token = this.jwtService.sign(payload);
    const expiration = this.jwtService.decode(access_token);
    return {
      access_token: access_token,
      expiresIn: expiration,
    };
  }

  async register(user: UserDTO) {
    const today = new Date();
    Logger.log(user, 'AUTH REGISTER');
    const registerUser = await this.usersService.create(user);
    if (registerUser) {
      return {
        statusCode: HttpStatus.OK,
        message: 'User registered successfully',
        data: registerUser,
      };
    }
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'User registration failed.',
    };
  }
}
