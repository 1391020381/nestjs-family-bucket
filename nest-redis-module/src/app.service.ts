import { Injectable, Inject } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
@Injectable()
export class AppService {
  @Inject(RedisService)
  private readonly redisService: RedisService;
  async getHello() {
    const value = await this.redisService.get('a');
    return `Hello World! ${value}`;
  }
}
