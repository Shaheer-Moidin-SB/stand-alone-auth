import { Injectable } from '@nestjs/common';
import { SessionRedisService } from 'src/session/redis.service';
import { AuthJwtService } from './auth/jwt/jwt.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly authJwtService: AuthJwtService,
    private readonly redisService: SessionRedisService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async validateUser(userId: string) {
    try {
      const token = await this.redisService.getSession(userId); // Fetch token from Redis

      const isBlacklisted = await this.redisService.isTokenInBlacklist(
        userId,
        token,
      );

      if (isBlacklisted) {
        await this.redisService.deleteSession(userId);
        await this.redisService.removeFromBlacklist(userId);
        throw 'User got blacklisted! So user need to try logging again';
      }

      // Validate the token using the JWT service
      const decodedToken = await this.authJwtService.validateToken(token);

      if (!decodedToken) {
        throw 'User Authentication Failed';
      }
      return true;
    } catch (e) {
      throw e;
    }
  }
}
