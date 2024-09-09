import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async validateToken(token: string) {
    try {
      // Verify the token using the secret key
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: 'my_secret',
      });

      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
