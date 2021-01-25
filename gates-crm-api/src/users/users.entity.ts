/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRoleEntity } from 'src/user-role/user-role.entity';

@Entity('users')
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
    console.log("ENTITY PASSWORD HASh"+this.password)

    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({
    nullable: false,
    length: 90,
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

  @ManyToOne(() => UserRoleEntity, role => role.id)
  role: UserRoleEntity;

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
  
}
