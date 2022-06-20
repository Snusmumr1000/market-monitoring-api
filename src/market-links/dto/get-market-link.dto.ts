import { ApiProperty } from '@nestjs/swagger';

export class GetMarketLinkDto {
  @ApiProperty()
  url: string;
  @ApiProperty()
  id: number;
}
