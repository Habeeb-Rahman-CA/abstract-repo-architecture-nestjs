import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  current_password: string;

  @IsNotEmpty()
  @ApiProperty()
  new_password: string;

}
