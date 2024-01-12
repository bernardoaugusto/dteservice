import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { HashComparer } from 'src/common/interfaces/criptography/hash-comparer.interface';
import { Hasher } from 'src/common/interfaces/criptography/hasher.interface';
import { configService } from '../../config/config.service';

@Injectable()
export class BcryptAdapter implements Hasher, HashComparer {
  private readonly saltOrRounds: string;

  constructor() {
    this.saltOrRounds = configService.getBcryptConfig().saltOrRounds;
  }

  public async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.saltOrRounds);

    return hash;
  }

  public async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash);

    return isValid;
  }
}
