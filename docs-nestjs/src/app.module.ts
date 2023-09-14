import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { LoggerMiddleware } from './common/logger.middleware';
import { Connection } from './connection';
import { ScheduleModule } from '@nestjs/schedule';
import { SerializationModule } from './serialization/serialization.module';
import { VersioningModule } from './versioning/versioning.module';
import { TaskSchedulingModule } from './task-scheduling/task-scheduling.module';
import { QueuesModule } from './queues/queues.module';
import { LoggerModule } from './logger/logger.module';
import { UploadModule } from './upload/upload.module';
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
    CacheModule.register(),
    ScheduleModule.forRoot(),
    WinstonModule.forRoot({
      transports: [
        new DailyRotateFile({
          level: 'error',
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          handleExceptions: true,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
        new DailyRotateFile({
          level: 'warn',
          filename: 'logs/warn-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          handleExceptions: true,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
        new DailyRotateFile({
          level: 'info',
          filename: 'logs/info-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          handleExceptions: true,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    }),
    CatModule,
    SerializationModule,
    VersioningModule,
    TaskSchedulingModule,
    QueuesModule,
    LoggerModule,
    UploadModule,
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
