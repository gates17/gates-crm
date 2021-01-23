import { Injectable, Logger } from '@nestjs/common';
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
    //const user = await this.usersService.findByEmail(username);
    const user = await this.usersService.login(data);
    if (user) {
      // if (user && await user.comparePassword(password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    const access_token = this.jwtService.sign(payload);
    const expiration = this.jwtService.decode(access_token);
    return {
      access_token: access_token,
      expiresIn: expiration,
    };
  }
}

/* constructor(private usersService: Repository<UsersEntity>) {}

async validateUser(data: UserLoginDTO): Promise<any> {
  const { username, password } = data;
  const user = await this.usersService.findOne({
    where: [
      {
        username: username,
        email: username,
      },
    ],
  });
  if (user && (await user.comparePassword(password))) {
    const { password, ...result } = user;
    return result;
  }
  return null;
} */
