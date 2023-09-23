import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';

// export const Ccc = (...args: string[]) => SetMetadata('ccc', args);

export const Ccc = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    return 'ccc createParamDecorator';
  },
);
