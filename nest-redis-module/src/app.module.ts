import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';
import { GoodsModule } from './goods/goods.module';

@Module({
  imports: [RedisModule, UserModule, GoodsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
