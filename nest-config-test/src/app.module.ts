import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        path.join(process.cwd(), '.aaa.env'),
        path.join(process.cwd(), '.env'),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
