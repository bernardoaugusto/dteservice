import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRoleEnum } from '../auth/auth.interface';
import { RegistrationNumberTypeEnum } from './users.interface';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'registration_number' })
  registrationNumber: string;

  @Column({
    name: 'registration_number_type',
    type: 'enum',
    enum: RegistrationNumberTypeEnum,
  })
  registrationNumberType: RegistrationNumberTypeEnum;

  @Column()
  email: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({
    array: true,
    type: 'enum',
    enum: UserRoleEnum,
  })
  roles: UserRoleEnum[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
