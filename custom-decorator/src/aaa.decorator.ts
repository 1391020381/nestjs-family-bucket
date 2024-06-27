import { SetMetadata } from '@nestjs/common';

export const Aaa = (...args: string[]) => {
  console.log('Aaaa');
  return SetMetadata('aaa', args);
};
