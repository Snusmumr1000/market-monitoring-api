import { ApiProperty } from '@nestjs/swagger';

export class UpdateMarketLinkDto {
  @ApiProperty()
  url: string;
  @ApiProperty()
  id: number;
}
