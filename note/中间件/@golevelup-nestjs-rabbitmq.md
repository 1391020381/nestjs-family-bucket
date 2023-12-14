# @golevelup/nestjs-rabbitmq

- It allows you to expose normal NestJS service methods as messaging handlers that can be configured to support a variety of messaging patterns

1. Exposing Pub/Sub Handlers
   - Simply apply the RabbitSubscribe decorator to a new or existing NestJS service class. When a message matching the exchange and routing key is received over RabbitMQ,the service method will automatically be invoked with the message allowing it to be handled as necessary

```
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagingService {
  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'subscribe-route',
    queue: 'subscribe-queue',
  })
  public async pubSubHandler(msg: {}) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
  }
}

```

- 在 bpmn-engine中

1. TypeOrmodule
2. RedisModule
3. PersistanceModule
   - MQModule
   - LoggerModule
   - RedisLockModule
4. ## EngineModule
