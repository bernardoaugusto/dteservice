import jwt from 'jsonwebtoken';
import { Encrypter } from 'src/common/interfaces/criptography/encrypter.interface';

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret);
    return accessToken;
  }
}
