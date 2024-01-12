import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { configService } from './config/config.service';
import { AuthModule } from './modules/auth/auth.module';
import { AdaptersModule } from './adapters/adapters.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...configService.getTypeOrmConfig(),
    }),
    UsersModule,
    AuthModule,
    AdaptersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
