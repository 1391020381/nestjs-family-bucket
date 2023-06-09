import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('app_service') private readonly appService2: AppService,
    @Inject('person') private readonly person: { name: string; age: number },
    @Inject('person2') private readonly person2: { name: string; desc: string },
    @Inject('person5') private readonly person5: { name: string; desc: string },
    @Inject('person3') private readonly person3: { name: string; desc: string },
    @Inject('person4') private readonly person4: { name: string; desc: string },
  ) {}

  @Get()
  getHello(): string {
    console.log('appService2:', this.appService2.getHello());
    console.log('person:', this.person);
    console.log('person2:', this.person2);
    console.log('person5:', this.person5);
    console.log('person3:', this.person3);
    console.log('person4:', this.person4);
    return this.appService.getHello();
  }
}
