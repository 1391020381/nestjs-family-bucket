import { Module } from '@nestjs/common';
import { XxxxService } from './xxxx.service';
import { XxxxController } from './xxxx.controller';

@Module({
  controllers: [XxxxController],
  providers: [XxxxService]
})
export class XxxxModule {}
