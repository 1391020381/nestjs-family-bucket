import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCatDto2 {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: number;
}
