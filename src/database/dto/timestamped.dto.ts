import { ApiProperty } from '@nestjs/swagger';

export class TimestampedDto {
  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;
}
