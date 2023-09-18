import { Module } from '@nestjs/common';
import { WebsocketsService } from './websockets.service';
import { WebsocketsController } from './websockets.controller';

@Module({
  controllers: [WebsocketsController],
  providers: [WebsocketsService]
})
export class WebsocketsModule {}
