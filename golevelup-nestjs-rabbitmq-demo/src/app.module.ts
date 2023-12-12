import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange_name',
          type: 'topic',
        },
      ],
      uri: 'amqp://admin:admin@localhost:5672',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
