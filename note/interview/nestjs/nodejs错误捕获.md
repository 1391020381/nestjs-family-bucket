
* process.on('uncaughtException')
* 如果代码逻辑中未捕获到的错误，最终会走到这里来

* process.on('unhandledRejection')
* 用于 promise的rejec行为未进行处理,而走到reject行为。

```
process.on('unhandledRejection', err => {
    console.log('err', err, 'unhandledRejection');
    reportError(err); // 上报错误
  })
process.on('uncaughtException', err => {
  console.error('有一个未捕获的错误', err);
  reportError(err); // 上报错误
  process.exit(1) //强制性的（根据 Node.js 文档）
});



```


* nestjs

```
// exception-interception.ts
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                catchError((err) => {
                    const request = context.switchToHttp().getRequest();
                    console.error(err, '=======err');
                    reportError({ log: err.stack, req: request }); // 上报错误
                    return throwError(new HttpException('页面发生错误', 500))
                }),
            );
    }
}

// app.controller.ts

@UseInterceptors(new ErrorsInterceptor())
@Controller('**')
export class AppController {}



```