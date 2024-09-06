import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: 'secretKey',
        });
      }

      async validate(payload: any) {
        // Perform necessary validation here, like fetching user from Redis or cache
        return { userId: payload.sub, username: payload.username };
      }
}