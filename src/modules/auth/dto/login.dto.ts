import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty,IsInt,IsString, IsOptional, Max } from 'class-validator';

export class LoginDto {

  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}