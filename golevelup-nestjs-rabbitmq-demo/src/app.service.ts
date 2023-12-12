import { Injectable } from '@nestjs/common';
import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class AppService {
  @RabbitRPC({
    exchange: 'exchange_name',
    routingKey: 'route_key',
    queue: 'queue_name',
  })
  public async rpcHandler(msg: { text: string }) {
    console.log('RPC Handler received:', msg);
    return {
      response: `Received message: ${msg.text}`,
    };
  }

  @RabbitSubscribe({
    exchange: 'exchange_name',
    routingKey: 'route_key',
    queue: 'queue_name',
  })
  public async pubSubHandler(msg: { text: string }) {
    console.log('PubSub Handler received:', msg);
  }
}
