# ExceptionFilter 与 Interceptors

在 NestJS 中，Exception Filters 和 Interceptors 是两个不同的机制，分别用于处理不同阶段的请求/响应生命周期。它们的核心区别和协作关系如下：

1. 职责区别
   (1) Exception Filters（异常过滤器）

作用：专门处理 未捕获的异常（如 HttpException、自定义异常等）。场景：当控制器或服务抛出异常时，异常过滤器负责将异常转换为对客户端的响应（如自定义错误格式、日志记录）。响应流程：
请求 → 控制器 → 抛出异常 → 异常过滤器 → 客户端
(2) Interceptors（拦截器）

作用：拦截 正常流程的请求和响应，可以在方法执行前后插入逻辑。场景：统一处理成功的响应（如包装数据结构、添加通用字段）、日志记录、性能监控等。响应流程：
请求 → 拦截器（前置处理）→ 控制器 → 拦截器（后置处理）→ 客户端

2. 统一数据结构的关键
   若需要为前端提供统一的数据结构（如 { code: number, data: T, message: string }），两者需要协作：
   (1) 正常响应（Interceptor 处理）

Interceptor 负责将控制器的返回值包装成统一结构：{
code: 200,
data: originalData, // 原始数据
message: 'success'
}

(2) 异常响应（Exception Filter 处理）

Exception Filter 负责将异常转换为统一的错误结构：{
code: 500,
data: null,
message: 'Internal Server Error'
}

3. 实现示例
   (1) 统一响应的 Interceptor
   import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
   import { Observable } from 'rxjs';
   import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
return next.handle().pipe(
map((data) => ({
code: 200,
data,
message: 'success',
})),
);
}
}

(2) 统一错误格式的 Exception Filter
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
catch(exception: HttpException, host: ArgumentsHost) {
const ctx = host.switchToHttp();
const response = ctx.getResponse<Response>();
const status = exception.getStatus();

    response.status(status).json({
      code: status,
      data: null,
      message: exception.message || 'Unknown Error',
    });

}
}

(3) 全局注册
// main.ts
app.useGlobalInterceptors(new TransformInterceptor());
app.useGlobalFilters(new HttpExceptionFilter());

4. 为什么需要两者协作？

异常和正常响应是两条独立流程：

如果控制器正常返回数据，由 Interceptor 处理。如果控制器抛出异常，由 Exception Filter 处理。
统一性：两者需要约定相同的字段（如 code、data、message），确保前端无论收到成功还是错误，数据结构一致。

5. 总结

机制
处理阶段
核心职责
数据结构统一的关键

Exception Filter
异常处理阶段
转换异常为客户端响应
定义错误响应的 code 和 message

Interceptor
正常请求/响应阶段
包装成功数据、添加通用元信息
定义成功响应的 code 和 data

通过两者的协作，可以确保整个应用对前端暴露的接口在 成功和错误场景下保持一致的响应格式，提升开发体验和可维护性。
