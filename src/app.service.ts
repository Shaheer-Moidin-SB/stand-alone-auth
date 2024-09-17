import { Injectable } from '@nestjs/common';
import { SessionRedisService } from 'src/session/redis.service';
import { AuthJwtService } from './auth/jwt/jwt.service';
import * as CryptoJS from 'crypto-js';
@Injectable()
export class AuthService {
  constructor(
    private readonly authJwtService: AuthJwtService,
    private readonly redisService: SessionRedisService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async validateUser(token: string) {
    try {
      const bytes = CryptoJS.AES.decrypt(token, 'secret key 123');
      const decodedToken = bytes.toString(CryptoJS.enc.Utf8);
      // const token = await this.redisService.getSession(userId); // Fetch token from Redis

      // const isBlacklisted = await this.redisService.isTokenInBlacklist(
      //   userId,
      //   token,
      // );

      //this can check any blacklisted user or expired token
      // if (isBlacklisted) {
      //   await this.redisService.deleteSession(userId);
      //   await this.redisService.removeFromBlacklist(userId);
      //   throw 'User got blacklisted! So user need to try logging again';
      // }

      // Validate the token using the JWT service
      const verifiedToken =
        await this.authJwtService.validateToken(decodedToken);

      if (!verifiedToken) {
        throw 'User Authentication Failed';
      }
      return true;
    } catch (e) {
      throw e;
    }
  }
}
