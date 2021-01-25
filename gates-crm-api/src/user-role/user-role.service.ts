import { UserRoleDTO } from './user-role.dto';
import { Injectable, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { UserRoleEntity } from './user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRoleEntity)
    private roleRepository: Repository<UserRoleEntity>,
  ) {}

  async showAll() {
    const data = await this.roleRepository.find();
    if (!data) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async findById(id: number) {
    const data = await this.roleRepository.findOne({ where: { id: id } });
    if (!data) {
      throw new HttpException('Role Not Found', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async create(data: UserRoleDTO) {
    const checkRole = await this.roleRepository.findOne({
      where: {
        role: data.role,
      },
    });

    if (checkRole) {
      throw new HttpException('User already exists', HttpStatus.FOUND);
    }
    const role = await this.roleRepository.create(data);
    await this.roleRepository.save(role);
    // Logger.log('CREATING ', 'USERSERVICE');
    return role;
  }

  async findByName(role: string): Promise<UserRoleDTO> {
    return await this.roleRepository.findOne({
      where: [{ role: role }],
    });
  }

  async update(id: number, data: Partial<UserRoleDTO>) {
    const role = await this.roleRepository.findOne(id);
    if (!role) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    await this.roleRepository.update({ id }, data);
    return await this.roleRepository.findOne({ id });
  }

  async destroy(id: number) {
    await this.roleRepository.delete({ id });
    return { deleted: true };
  }
}
