import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { configService } from '../../../config/config.service';
import { TokenJwtPayloadInterface } from '../auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(configService.getJwtStrategyConfig());
  }

  public async validate(payload: TokenJwtPayloadInterface) {
    return payload;
  }
}
