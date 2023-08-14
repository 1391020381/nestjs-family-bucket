import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Aaa } from './aaa.entity';
import { AppService } from './app.service';
import { createClient } from 'redis';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: 'localhost',
      host: 'mysql-container-1',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'aaa',
      synchronize: true,
      logging: true,
      entities: [Aaa],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            // host: 'localhost',
            host: 'redis-container-1',
            port: 6379,
          },
        });
        await client.connect();
        return client;
      },
    },
  ],
})
export class AppModule {}
