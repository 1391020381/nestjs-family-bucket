import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AaaGuard } from './aaa.guard';
import { Aaa } from './aaa.decorator';
import { Bbb } from './bbb';
import { Ccc } from './ccc';
import { MyHeaders } from './header';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @SetMetadata('aaa', 'admin')
  @Aaa('admin')
  @UseGuards(AaaGuard)
  getHello(): string {
    return this.appService.getHello();
  }
  @Bbb('hello2', 'admin-hello2')
  getHello3(): string {
    return this.appService.getHello();
  }

  @Get('hello4')
  getHello4(@Ccc('自定义参数装饰器') c, @MyHeaders('Accept') header2) {
    console.log('header2:', header2);
    return c;
  }
}
