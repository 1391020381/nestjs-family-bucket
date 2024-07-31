import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
@Catch(BadRequestException)
export class HelloFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();
    const statusCode = exception.getStatus();
    response.status(statusCode).json({
      code: statusCode,
      message: exception.message,
      error: 'Bad Request',
      xxx: 111,
    });
  }
}
