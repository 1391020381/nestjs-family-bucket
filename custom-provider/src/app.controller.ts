import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(
    @Inject('app_service') private readonly appService: AppService,
    @Inject('person') private readonly person: { name: string; age: number },
    @Inject('person2') private readonly person2: { name: string; age: number },
    @Inject('person3') private readonly person3: { name: string; age: number },
    @Inject('person5') private readonly person5: { name: string; age: number },
    @Inject('person4') private readonly person4: { name: string; age: number },
  ) {}
  @Get()
  getHello(): string {
    console.log('person:', this.person);
    console.log('person2:', this.person2);
    console.log('person3:', this.person3);
    console.log('person4:', this.person4);
    console.log('person5:', this.person5);
    return this.appService.getHello();
  }
}
