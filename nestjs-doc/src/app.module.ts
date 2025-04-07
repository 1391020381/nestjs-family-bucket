import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerModule } from './controller/controller.module';
import { ProviderModule } from './provider/provider.module';

@Module({
  imports: [ControllerModule, ProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
