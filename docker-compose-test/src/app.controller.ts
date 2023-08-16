import { Controller, Get, Inject, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisClientType } from 'redis';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  @Get()
  async getHello(@Headers() headers) {
    // console.log('----getHello----');
    // console.log(headers);
    console.log('---access---');
    const keys = await this.redisClient.keys('*');
    console.log('keys:', keys);
    return this.appService.getHello();
  }
}
