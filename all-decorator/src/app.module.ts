import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Guang } from './guang';
@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    Guang,
    {
      provide: 'Guang',
      useFactory() {
        return {
          name: 'guang',
        };
      },
    },
  ],
})
export class AppModule {}
