import {
  Controller,
  Get,
  Inject,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AaaGuard } from './aaa.guard';
import { Aaa } from './aaa.decorator';
import { Bbb } from './bbb.decorator';
import { Ccc } from './ccc.decorator';
import { DddGuard } from './ddd.guard';
import { DddInterceptor } from './ddd.interceptor';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('app_service') private readonly appService2: AppService,
  ) {}

  @Get()
  // @SetMetadata('aaa', 'admin')
  @Aaa('admin', 'aaaaa', 'bbbbb')
  @UseGuards(AaaGuard)
  getHello(): string {
    // return this.appService2.getHello();
    return this.appService.getHello();
  }
  @Bbb('hello3', 'admin')
  getHello3(): string {
    console.log('this.appService2:', this.appService2);
    return this.appService2.getHello();
  }
  @Get('hello4')
  getHello4(@Ccc() c) {
    return c;
  }
  @Get('hello5')
  @UseGuards(DddGuard)
  @UseInterceptors(DddInterceptor)
  @SetMetadata('roles', ['admin'])
  getHello5(): string {
    return 'getHello5';
  }
}
