import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { UserRoleEnum } from '../auth/auth.interface';
import { RegistrationNumberTypeEnum } from './users.interface';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'registration_number' })
  registrationNumber: string;

  @Column({ name: 'registration_number_type' })
  registrationNumberType: RegistrationNumberTypeEnum;

  @Column()
  email: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ array: true, type: 'text' })
  roles: UserRoleEnum[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @BeforeInsert()
  private hashPassword(): void {
    this.password = hashSync(this.password, 10);
  }
}
