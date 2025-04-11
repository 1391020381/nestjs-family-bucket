import { IsString, IsInt } from 'class-validator';

export class CreatePipeDto {
  @IsString()
  name: string;
  @IsInt()
  age: number;
  @IsString()
  breed: string;
}
