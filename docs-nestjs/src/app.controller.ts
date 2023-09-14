import {
  Controller,
  Get,
  Post,
  Inject,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    private configService: ConfigService,
    private readonly appService: AppService,
    @Inject('app_service') private readonly appService2: AppService,
    @Inject('person') private readonly person: any,
  ) {}

  @Get()
  // @SetMetadata('aaa', 'admin')
  @Aaa('admin', 'aaaaa', 'bbbbb')
  @UseGuards(AaaGuard)
  getHello(): string {
    // return this.appService2.getHello();
    const http = this.configService.get('http');
    console.log('http:', http);
    console.log('http.port:', http.port);
    return this.appService.getHello();
  }
  @Bbb('hello3', 'admin')
  getHello3(): string {
    console.log('this.appService2:', this.appService2);
    return this.appService2.getHello();
  }
  @Get('hello4')
  getHello4(@Ccc() c) {
    return c + '<br/>' + this.person.name + '<br/>' + this.person.age;
  }
  @Get('hello5')
  @UseGuards(DddGuard)
  @UseInterceptors(DddInterceptor)
  @SetMetadata('roles', ['admin'])
  getHello5(): string {
    return 'getHello5';
  }
}
