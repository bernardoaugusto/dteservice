import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { configService } from './config/config.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...configService.getTypeOrmConfig(),
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
