import { Module } from '@nestjs/common';
import { CccController } from './ccc.controller';

@Module({
  controllers: [CccController]
})
export class CccModule {}
