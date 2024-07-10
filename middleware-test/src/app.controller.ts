import { Controller, Get, Next } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('hello2')
  getHello2(): string {
    console.log('hello2');
    return this.appService.getHello();
  }
  @Get('world1')
  getWorld1(): string {
    console.log('world1');
    return this.appService.getHello();
  }
  @Get('world2')
  getWorld2(): string {
    console.log('world2');
    return this.appService.getHello();
  }
  @Get('bbb')
  b1(@Next() next) {
    next();
    return 'hello1';
  }

  @Get('bbb')
  b2() {
    // next();
    return 'bbb -next';
  }
}
