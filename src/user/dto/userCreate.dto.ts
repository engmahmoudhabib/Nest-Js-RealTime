import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  avatar: string;
}
