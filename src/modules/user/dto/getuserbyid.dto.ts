import { ApiProperty } from '@nestjs/swagger';

export class GetUserByIdDto {
  @ApiProperty()
  user_id?: number;

}