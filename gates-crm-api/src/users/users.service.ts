import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginDTO, UserDTO } from './users.dto';

import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async showAll() {
    return await this.usersRepository.find();
  }

  async findById(id: number) {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async create(data: UserDTO) {
    const user = this.usersRepository.create(data);
    await this.usersRepository.save(data);
    return user;
  }

  async findByEmail(email: string): Promise<UserLoginDTO> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async update(id: number, data: Partial<UserDTO>) {
    await this.usersRepository.update({ id }, data);
    return await this.usersRepository.findOne({ id });
  }

  async destroy(id: number) {
    await this.usersRepository.delete({ id });
    return { deleted: true };
  }
}
