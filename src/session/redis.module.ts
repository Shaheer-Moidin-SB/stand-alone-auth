import { Module } from '@nestjs/common';
import { SessionRedisService } from './redis.service';

@Module({
  providers: [SessionRedisService],
  exports: [SessionRedisService],
})
export class SessionModule {}
