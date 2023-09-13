import {
  Controller,
  Get,
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
  constructor(private readonly appService: AppService) {}

  @Get()
  // @SetMetadata('aaa', 'admin')
  @Aaa('admin', 'aaaaa', 'bbbbb')
  @UseGuards(AaaGuard)
  getHello(): string {
    return this.appService.getHello();
  }
  @Bbb('hello3', 'admin')
  getHello3(): string {
    return 'Bbb装饰器';
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
