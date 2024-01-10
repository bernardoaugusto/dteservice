import { DataSource } from 'typeorm';
import { configService } from '../config/config.service';

const AppDataSource = new DataSource(configService.getTypeOrmConfig());
export default AppDataSource;
