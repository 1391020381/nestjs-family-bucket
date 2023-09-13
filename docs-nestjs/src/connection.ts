import { Injectable } from '@nestjs/common';

@Injectable()
export class Connection {
  getHello(): string {
    return 'Connection';
  }
}
