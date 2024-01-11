import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UsersEntity } from '../../modules/users/users.entity';
import { UserRoleEnum } from '../../modules/auth/auth.interface';
import { RegistrationNumberTypeEnum } from '../../modules/users/users.interface';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const users = [
      {
        id: '947e30d9-6f3f-47e9-ac0a-53041763a528',
        name: 'root',
        email: 'root@mail.com',
        password: '123456',
        roles: [UserRoleEnum.ADMIN],
        registrationNumber: '00000000000',
        registrationNumberType: RegistrationNumberTypeEnum.CPF,
        phoneNumber: '(31) 99999-9999',
      },
    ];

    const repository = dataSource.getRepository(UsersEntity);
    await repository.save(users);
  }
}
