import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty,IsInt,IsString, IsOptional, Max } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @ApiProperty()
  name: string;
  
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  role_id: number;

  @IsNotEmpty()
  @ApiProperty()
  department_id: number;

  @IsNotEmpty()
  @ApiProperty()
  vendor_id: number;

  @IsNotEmpty()
  @ApiProperty()
  status: boolean;
}