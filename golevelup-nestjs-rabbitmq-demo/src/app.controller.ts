import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @Get('send')
  async send(@Query('text') text: string) {
    await this.amqpConnection.publish('exchange_name', 'route_key', { text });
    return 'Message sent';
  }
}
