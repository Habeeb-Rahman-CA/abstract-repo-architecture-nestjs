import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class ForgotPasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
