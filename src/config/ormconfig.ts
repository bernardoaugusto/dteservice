import { DataSource } from 'typeorm';
import { configService } from './config.service';

const AppDataSource = new DataSource({
  ...configService.getTypeOrmConfig(),
  migrations: ['src/database/migrations/*.ts'],
});

export default AppDataSource;
