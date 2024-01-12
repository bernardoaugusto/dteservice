import { Module } from '@nestjs/common';
import { BcryptAdapter } from './bcrypt-adapter/bcrypt-adapter';

@Module({ providers: [BcryptAdapter], exports: [BcryptAdapter] })
export class AdaptersModule {}
