import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MessagesHelper } from 'src/utils/helpers/messages.helper';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'registrationNumber',
      passwordField: 'password',
    });
  }

  public async validate(registrationNumber: string, password: string) {
    const user = await this.authService.validateUser(
      registrationNumber,
      password,
    );

    if (!user)
      throw new UnauthorizedException(MessagesHelper.PASSWORD_OR_EMAIL_INVALID);

    return user;
  }
}
