import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message: string, code: number) {
    // super('Forbidden', HttpStatus.FORBIDDEN);
    super(message || 'Forbidden', code || HttpStatus.FORBIDDEN);
  }
}
