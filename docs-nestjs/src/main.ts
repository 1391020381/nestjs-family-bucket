import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { CustomExceptionFilter } from './common/CustomExceptionFilter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
