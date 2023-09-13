import { SetMetadata, Get, applyDecorators, UseGuards } from '@nestjs/common';
import { Aaa } from './aaa.decorator';
import { AaaGuard } from './aaa.guard';

// export const Bbb = (...args: string[]) => SetMetadata('bbb', args);

export function Bbb(path, role) {
  return applyDecorators(Get(path), Aaa(role), UseGuards(AaaGuard));
}
