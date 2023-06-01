import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa/aaa.module';
import { XxxxModule } from './xxxx/xxxx.module';

@Module({
  imports: [AaaModule, XxxxModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
