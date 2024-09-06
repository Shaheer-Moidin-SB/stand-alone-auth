import { Module } from '@nestjs/common';
import { AppController } from './auth/auth.controller';
import { AppService } from './auth/auth.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
