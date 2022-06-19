import { Module } from '@nestjs/common';
import { MarketLinksController } from './market-links.controller';
import { MarketLinksService } from './market-links.service';

@Module({
  imports: [],
  controllers: [MarketLinksController],
  providers: [MarketLinksService],
})
export class MarketLinksModule {}
