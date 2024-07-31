import { Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { AaaV2Controller } from './aaa-v2.controller';

@Module({
  controllers: [AaaController, AaaV2Controller],
  providers: [AaaService],
})
export class AaaModule {}
