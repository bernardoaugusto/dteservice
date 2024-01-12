import { JwtModuleOptions } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { ExtractJwt, StrategyOptions } from 'passport-jwt';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', false) || 3000;
  }

  public isProduction() {
    const mode = this.getValue('NODE_ENV', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): DataSourceOptions & SeederOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      entities: [join(__dirname, '..', 'modules/**/*.entity{.ts,.js}')],
      synchronize: false,
      migrationsTableName: 'migrations',
      ssl: this.isProduction(),

      seeds: [join(__dirname, '..', 'database/seeds/*seeder{.ts,.js}')],
      factories: [join(__dirname, '..', 'database/factories//*{.ts,.js}')],
    };
  }

  public getJwtConfig(): JwtModuleOptions {
    return {
      privateKey: this.getValue('JWT_PRIVATE_KEY'),
      signOptions: { expiresIn: '1d' },
    };
  }

  public getJwtStrategyConfig(): StrategyOptions {
    return {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: this.getValue('JWT_PRIVATE_KEY'),
    };
  }

  public getBcryptConfig(): { saltOrRounds: string } {
    return {
      saltOrRounds: this.getValue('BCRYPT_SALT_OR_ROUNDS'),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
  'JWT_PRIVATE_KEY',
  'BCRYPT_SALT_OR_ROUNDS',
]);

export { configService };
