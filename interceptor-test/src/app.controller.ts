import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AaaInterceptor } from './aaa.interceptor';
import { MapTestInterceptor } from './map-test.interceptor';
import { TapTestInterceptor } from './tap-test.interceptor';
import { CatchErrorTestInterceptor } from './catch-error-test.interceptor';
import { TimeoutInterceptor } from './timeout.interceptor';
import { resolve } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(AaaInterceptor)
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('aaa')
  @UseInterceptors(MapTestInterceptor)
  aaa() {
    return 'aaaa';
  }
  @Get('bbb')
  @UseInterceptors(TapTestInterceptor)
  bbb() {
    return 'bbb';
  }
  @Get('ccc')
  @UseInterceptors(CatchErrorTestInterceptor)
  ccc() {
    throw new Error('xxxx');
    return 'ccc';
  }

  @Get('ddd')
  @UseInterceptors(TimeoutInterceptor)
  async ddd() {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    return 'dddd';
  }
  @Get('eee')
  eee() {
    return 'eee';
  }
}
