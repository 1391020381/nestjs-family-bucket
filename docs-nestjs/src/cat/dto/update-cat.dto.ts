import { PartialType } from '@nestjs/mapped-types';
// import { CreateCatDto } from './create-cat.dto';

// export class UpdateCatDto extends PartialType(CreateCatDto) {}

import { z } from 'zod';

import { createCatSchema } from './create-cat.dto';

export type UpdateCatDto = z.infer<typeof createCatSchema>;
