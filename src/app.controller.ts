import { Controller, Get } from '@nestjs/common';
import { AuthService } from './app.service';
import { MessagePattern, RpcException, Transport } from '@nestjs/microservices';
@Controller()
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('authorize_user', Transport.KAFKA) // Listening for 'authorize_user' event
  async authorizeUser(data: any) {
    try {
      console.log('Authorization Service pinging....');
      const isValid = await this.appService.validateUser(data.userId);
      return isValid;
    } catch (oError) {
      console.error('Error while authorizing user:', oError);
      throw new RpcException('Error while creating order ' + oError);
    }
  }
}
