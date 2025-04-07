import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerModule } from './controller/controller.module';
import { ProviderModule } from './provider/provider.module';
import { ModulesModule } from './modules/modules.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
@Module({
  imports: [ControllerModule, ProviderModule, ModulesModule, MiddlewareModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
