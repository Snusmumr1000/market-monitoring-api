import { ApiProperty } from '@nestjs/swagger';

export class CreateMarketLinkDto {
  @ApiProperty()
  url: string;
}
