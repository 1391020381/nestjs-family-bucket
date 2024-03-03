# IOC
* Nest框架的IOC(控制反转) 机制 提供了一种灵活的方式来管理代码之间的依赖关系。

* 首先,Nest使用装饰器(例如 @Injectable()) 来定义一个可以被注入的类。通过这种方式 Nest可以跟踪哪些类时服务,并需要被注入。

```
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {}

```
* 然后,当你创建使用这些服务的类(如控制器)时,你可以在构造函数中添加这些服务作为参数。Nest会自动处理依赖注入(DI) 将所需的服务实例传递给类。

```
import { Controller } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
}

```
* 需要注意的是,实际的注入过程实际上是由Nest的容器管理的。容器的应用启动时会自动创建一个实例,并管理其生命周期。

* 通过这种方式,Nest可以提供强大的模块化和分离关注点,使的代码更易于管理和测试。

* 创建 复用 销毁。


# 使用多种Provider,灵活注入对象
* Nest实现了Ioc容器,会从入口模块开始扫描,分析Module之间的引用关系,对象之间的依赖关系,自动把provider注入到目标对象。
1. @Injectable 
    -  通过provide指定 token 通过useClass指定对象的类,Nest会自动对它的实例化后用来注入。
    -  通过构造函数  变量 注入
    - {
  provide: AppService,
  useClass: AppService
}
    
    
2. useValue
3. useFactory

```
{
    provide:'person2',
    useFactory(){
        return {
            name:"bbb",
            desc:'ccc'
        }
    }
}

// useFactory 支持通过参数注入别的 provider
{
    provide:'person3',
    useFactory(person:{name:string},appService:AppService){
        return {
            name:person.name,
            desc:appService.getHello()
        }
    },
    inject:['person',AppService]
}

// useFactory 支持异步

{
    provide:"person5",
    async useFactory(){
       return   await new Promise((resolve)=>{
            setTimeout(resolve,3000)
        })
    }
}

```

# AOP 
* 一个 请求过来 可能会经过 Controller Service  Repository 
* AOP的好处使可以把一些通用的逻辑分离到切面中,保持业务逻辑的纯粹性,这样切面逻辑可以复用,还可以动态的增删。
* Nest实现 AOP的方式更多,一共有五种,包括 Middleware Guard Pipe Interceptor ExceptionFilter
* 中间件 Middleware  全局中间件 和 路由中间件

```
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('before2', req.url);

    next();

    console.log('after2');
  }
}



```
* Guard 路由守卫  可以用于在调用某个Controller之前判断权限, 返回true 或者 false 来决定是否放行。

```
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('login check')
    return false;
  }
}



```

* Interceptor 
* Interceptor是拦截器的意思,可以在目标 Controller方法前后加入一些逻辑。
* @UseInterceptor()
```
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        console.log('time: ', Date.now() - startTime)
      })
    );
  }
}


```
* Pipe
* Pipe是管道的意思,用来对参数做一些校验和转换。
* @Query('num',ValidatePipe) num:number
```
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    if(Number.isNaN(parseInt(value))) {
      throw new BadRequestException(`参数${metadata.data}错误`)
    }

    return typeof value === 'number' ? value * 10 : parseInt(value) * 10;
  }
}


```
* ExceptionFilter
* Exceptionfilter可以对抛出的异常做处理，返回对应的响应。

```
import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class TestFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {

    const response: Response = host.switchToHttp().getResponse();

    response.status(400).json({
      statusCode: 400,
      message: 'test: ' + exception.message
    })
  }
}


```


# docker部署Nest服务


```
# build stage
FROM node:18 as build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm install --production
Run npm install pm2 -g
EXPOSE 3000

<!-- CMD ["node", "/app/main.js"] -->
CMD ["pm2-runtime","/app/main.js"]


```

* docker build -t nest:ccc . 
