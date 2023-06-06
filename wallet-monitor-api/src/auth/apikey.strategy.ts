import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import Strategy, { HeaderAPIKeyStrategy } from 'passport-headerapikey';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'apikey',
) {
  constructor(private authService: AuthService) {
    super(
      { header: 'Authorization', prefix: 'Bearer ' },
      true,
      (apikey, done) => {
        const checkKey = authService.validateApiKey(apikey);
        if (checkKey) {
          return done(null, true);
        }
        return new UnauthorizedException(), null;
      },
    );
  }
}
