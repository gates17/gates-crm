import { Injectable, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleEntity } from 'src/user-role/user-role.entity';
import { Repository, getRepository } from 'typeorm';
import { UserLoginDTO, UserDTO } from './users.dto';

import { UsersEntity } from './users.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async showAll() {
    const data = await this.usersRepository.find({ relations: ['role'] });
    if (!data) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async findById(id: number) {
    const data = await this.usersRepository.findOne({
      where: { id: id },
      relations: ['role'],
    });
    if (!data) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async create(data: UserDTO) {
    const checkuser = await this.usersRepository.findOne({
      where: { email: data.email },
      relations: ['role'],
    });

    if (checkuser) {
      throw new HttpException('User already exists', HttpStatus.FOUND);
    }
    const user = await this.usersRepository.create(data);
    const role = await getRepository(UserRoleEntity).findOneOrFail({
      where: { id: 2 },
    });
    user.role = role;
    await this.usersRepository.save(user);
    return user;
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: [{ email: email }, { username: email }],
      relations: ['role'],
    });
  }

  async update(id: number, data: Partial<UserDTO>) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.update({ id }, data);
    return await this.usersRepository.findOne({ id });
  }

  async destroy(id: number) {
    await this.usersRepository.delete({ id });
    return { deleted: true };
  }

  async login(data: UserLoginDTO) {
    const { username, password } = data;
    const user = await this.usersRepository.findOne({
      where: [{ email: username }, { username: username }],
    });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
