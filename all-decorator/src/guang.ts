import { Injectable } from '@nestjs/common';
import { AppService } from './app.service';

@Injectable()
export class Guang {
  constructor(private appService: AppService) {}
  getHello(): string {
    return this.appService.getHello() + 'Guang-provide-useClass';
  }
}
