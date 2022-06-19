import { Module } from '@nestjs/common';
import { MarketLinksController } from './market-links.controller';
import { MarketLinksService } from './market-links.service';
import { marketLinkProvider } from './market-links.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MarketLinksController],
  providers: [MarketLinksService, ...marketLinkProvider],
})
export class MarketLinksModule {}
