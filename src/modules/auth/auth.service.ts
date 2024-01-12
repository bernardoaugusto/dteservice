import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UsersEntity } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenJwtUserInterface } from './auth.interface';
import { BcryptAdapter } from 'src/adapters/bcrypt-adapter/bcrypt-adapter';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashComparer: BcryptAdapter,
  ) {}

  public async validateUser(registrationNumber: string, password: string) {
    let user: UsersEntity;

    try {
      user = await this.userService.findOneOrFail({ registrationNumber });
    } catch (error) {
      return null;
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) return null;

    return user;
  }

  public async login(
    user: UsersEntity,
  ): Promise<{ token: string; user: TokenJwtUserInterface }> {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    };

    return {
      token: this.jwtService.sign(payload),
      user: payload,
    };
  }
}
