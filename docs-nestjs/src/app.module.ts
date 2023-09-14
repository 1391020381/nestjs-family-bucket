import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { LoggerMiddleware } from './common/logger.middleware';
import { Connection } from './connection';
import configuration from '../config/configuration';
export const mockCatsService = {
  getHello: function () {
    return 'mockCatsService-getHello';
  },
};
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    CatModule,
  ],
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
    {
      provide: 'person',
      useValue: {
        name: 'aaa',
        age: 20,
      },
    },
    {
      provide: 'person2',
      useFactory() {
        return {
          name: 'bbb',
          desc: 'cccc',
        };
      },
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
