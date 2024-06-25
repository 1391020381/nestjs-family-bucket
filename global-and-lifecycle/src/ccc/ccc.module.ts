import {
  Global,
  Module,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { CccService } from './ccc.service';
import { CccController } from './ccc.controller';

@Global()
@Module({
  controllers: [CccController],
  providers: [CccService],
  exports: [CccService],
})
export class CccModule implements OnModuleInit, OnApplicationBootstrap {
  onModuleInit() {
    console.log('CccModule OnModuleInit');
  }
  onApplicationBootstrap() {
    console.log('CccModule onApplicationBootstrap');
  }
}
