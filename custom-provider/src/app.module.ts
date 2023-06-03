import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'app_service',
      useClass: AppService,
    },
    {
      provide: 'person',
      useValue: {
        name: 'aaaa person3',
        age: 20,
      },
    },
    {
      provide: 'person2',
      useFactory() {
        return {
          name: 'bbb',
          desc: 'cccc',
        };
      },
    },
    {
      provide: 'person5',
      async useFactory() {
        await new Promise((resolve) => {
          setTimeout(resolve, 3000);
        });
        return {
          name: 'bbb-person5',
          desc: 'cccc-person5',
        };
      },
    },
    {
      provide: 'person3',
      useFactory(person: { name: string }, appService: AppService) {
        return {
          name: person.name,
          desc: appService.getHello(),
        };
      },
      // 通过 inject 申明了两个 token 一个是字符串 token 的 person 一个 是 class  token 的 AppService
      // 在 调用 useFactory方法的时候 Nest就会注入这两个对象。
      // 其实就是上面 provide 的 person 修改值 可以发现联动
      inject: ['person', AppService],
    },
    {
      provide: 'person4',
      useExisting: 'person2',
    },
  ],
})
export class AppModule {}
