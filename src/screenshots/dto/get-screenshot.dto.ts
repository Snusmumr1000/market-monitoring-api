import { ApiProperty } from '@nestjs/swagger';
import { TimestampedDto } from '../../database/dto/timestamped.dto';

export class GetScreenshotDto extends TimestampedDto {
  @ApiProperty()
  content: string;
  @ApiProperty()
  marketLinkId: number;
}
