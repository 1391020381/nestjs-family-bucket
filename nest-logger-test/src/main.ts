import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './MyLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
    // logger: ['warn', 'error'],
    logger: new MyLogger(),
  });
  await app.listen(3002);
}
bootstrap();
