import { ApiProperty } from '@nestjs/swagger';
import { TimestampedDto } from '../../database/dto/timestamped.dto';

export class GetMarketLinkDto extends TimestampedDto {
  @ApiProperty()
  url: string;
  @ApiProperty()
  id: number;
}
