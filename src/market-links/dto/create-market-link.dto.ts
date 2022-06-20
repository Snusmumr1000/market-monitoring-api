import { ApiProperty } from '@nestjs/swagger';
import { TimestampedDto } from '../../database/dto/timestamped.dto';

export class CreateMarketLinkDto extends TimestampedDto {
  @ApiProperty()
  url: string;
}
