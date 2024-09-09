import { Module } from '@nestjs/common';
import { AuthController } from './app.controller';
import { AuthService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { SessionModule } from 'src/session/redis.module';
import { AuthJwtService } from './auth/jwt/jwt.service';
@Module({
  imports: [
    JwtModule.register({
      secret: 'my_secret',
      signOptions: { expiresIn: '1h' },
    }),
    // ClientsModule.register([
    //   {
    //     name: 'AUTH_SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         brokers: ['localhost:9092'],
    //       },
    //       consumer: {
    //         groupId: 'auth-service-consumer-group',
    //       },
    //     },
    //   },
    // ]),
    SessionModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthJwtService],
  exports: [AuthService],
})
export class AppModule {}
