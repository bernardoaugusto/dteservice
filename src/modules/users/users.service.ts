import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationNumberTypeEnum } from './users.interface';
import { CpfValidator } from '../../utils/custom-validations/cpf.validation';
import { UserRoleEnum } from '../auth/auth.interface';
import { BcryptAdapter } from '../../adapters/bcrypt-adapter/bcrypt-adapter';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly hasher: BcryptAdapter,
  ) {}

  public async store(
    data: Partial<UsersEntity>,
    roles = [UserRoleEnum.USER],
  ): Promise<UsersEntity> {
    const buildUser: Partial<UsersEntity> = {
      ...data,
      password: await this.hasher.hash(data.password),
      roles,
      registrationNumber: data.registrationNumber.replace(/[^\d]/g, ''),
      registrationNumberType: RegistrationNumberTypeEnum.CNPJ,
    };

    if (new CpfValidator().validate(data.registrationNumber))
      buildUser.registrationNumberType = RegistrationNumberTypeEnum.CPF;

    const user = this.usersRepository.create(buildUser);

    return await this.usersRepository.save(user);
  }

  public async findOneOrFail(
    params: {
      id?: string;
      email?: string;
      name?: string;
      registrationNumber?: string;
      phoneNumber?: string;
    },
    findOptions: FindOneOptions<UsersEntity> = {},
  ): Promise<UsersEntity> {
    const options = { ...findOptions, where: params };

    try {
      return await this.usersRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  public async findAll(): Promise<UsersEntity[]> {
    return await this.usersRepository.find({ select: ['id', 'name', 'email'] });
  }

  public async update(
    id: string,
    data: Partial<UsersEntity>,
  ): Promise<UsersEntity> {
    const user = await this.findOneOrFail({ id });
    this.usersRepository.merge(user, data);

    return await this.usersRepository.save(user);
  }

  public async destroy(id: string): Promise<UpdateResult> {
    const user = await this.findOneOrFail({ id });

    return await this.usersRepository.softDelete(user.id);
  }
}
