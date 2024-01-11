import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UsersEntity } from '../users/users.entity';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenJwtPayloadInterface } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string) {
    let user: UsersEntity;

    try {
      user = await this.userService.findOneOrFail({ email });
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) return null;

    return user;
  }

  public async login(user: UsersEntity): Promise<{ token: string }> {
    const payload: TokenJwtPayloadInterface = {
      userId: user.id,
      userEmail: user.email,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
