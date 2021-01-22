/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn } from 'typeorm';

@Entity('Users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 45,
  })
  username: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = this.password;
  }

  @Column({
    nullable: false,
    length: 45,
  })
  password: string;

  @Column({
    nullable: false,
    unique: true,
    length: 45,
  })
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @CreateDateColumn({
    nullable: true,
  })
  date_created: Date;

  @Column({
    default: true,
  })
  active: boolean;
}
