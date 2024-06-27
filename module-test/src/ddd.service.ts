import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CccService } from './ccc.service';

@Injectable()
export class DddService {
  constructor(
    @Inject(forwardRef(() => CccService)) private cccServie: CccService,
  ) {}
  ddd() {
    return this.cccServie.ccc() + 'ddd';
  }
}
