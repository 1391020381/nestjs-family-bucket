import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { CustomException } from './CustomException';
@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const message = exception.getResponse();
    console.log('CustomExceptionFilter:', status, message, exception);
    const code = exception instanceof CustomException ? exception : 500;
    response.status(status).json({
      code: code,
      message: message,
      timestamp: new Date().toISOString(),
    });
  }
}
