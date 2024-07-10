import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AppService } from './app.service';

@Injectable()
export class TapTestInterceptor implements NestInterceptor {
  constructor(private appService: AppService) {}
  private readonly logger = new Logger(TapTestInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // return next.handle();
    return next.handle().pipe(
      tap((data) => {
        this.appService.getHello();
        this.logger.log(`log something`, data);
      }),
    );
  }
}
