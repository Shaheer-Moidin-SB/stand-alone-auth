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

      // Validate the token using the JWT service
      const decodedToken = await this.authJwtService.validateToken(token);

      if (!decodedToken) {
        throw 'Invalid Token Provided';
      }
      return true;
    } catch (e) {
      throw 'Invalid Token Provided';
    }
  }
}
