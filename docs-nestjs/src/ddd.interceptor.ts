import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
@Injectable()
export class DddInterceptor implements NestInterceptor {
  @Inject(Reflector)
  private reflector: Reflector;
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('interceptor');
    const req = context.switchToHttp();
    const token = req.getRequest()['headers']['cookie'].split('=')[1];
    console.log('token:', token);
    console.log(this.reflector.get('roles', context.getHandler()));
    return next.handle();
  }
}
