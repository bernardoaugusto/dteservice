import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  public async store(data: Partial<UsersEntity>): Promise<UsersEntity> {
    const user = this.usersRepository.create(data);

    return await this.usersRepository.save(user);
  }

  public async findOneOrFail(
    params: Partial<UsersEntity>,
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
