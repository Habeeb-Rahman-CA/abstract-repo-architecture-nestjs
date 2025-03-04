import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  user_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  user_type_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  department_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  vendor_id?: number;

}
