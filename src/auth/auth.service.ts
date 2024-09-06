import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../session/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async validateToken(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token);
      // Optionally, check session in Redis
      const sessionData = await this.redisService.getSession(payload.sub);
      return sessionData ? payload : null;
    } catch (error) {
      return null;
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    const token = this.jwtService.sign(payload);
    // Store session in Redis
    await this.redisService.setSession(user.userId, { token });
    return { access_token: token };
  }
}
