import { Controller, Get, Inject, Optional } from '@nestjs/common';
import { AppService } from './app.service';
import { Guang } from './guang';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly guangUseClassProvide: Guang,
  ) {}

  @Inject('Guang')
  private readonly guang: Record<string, any>;

  // 可选
  @Optional()
  @Inject('Guang1')
  private readonly guang1: Record<string, any>;

  @Get()
  getHello(): string {
    console.log('Guang:', this.guang);
    console.log('guangUseClassProvide:', this.guangUseClassProvide.getHello());
    return this.appService.getHello();
  }
}
