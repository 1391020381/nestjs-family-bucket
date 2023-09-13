import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { LoggerMiddleware } from './common/logger.middleware';
import { Connection } from './connection';
export const mockCatsService = {
  getHello2: function () {
    return 'mockCatsService-getHello';
  },
};
@Module({
  imports: [CatModule],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useValue: mockCatsService,
    },
    {
      provide: 'app_service',
      useClass: AppService,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/cats/breed', method: RequestMethod.GET });
  }
}
