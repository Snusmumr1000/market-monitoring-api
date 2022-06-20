import { Module } from '@nestjs/common';
import { MarketLinksController } from './market-links.controller';
import { MarketLinksService } from './market-links.service';
import { marketLinkProvider } from './market-links.provider';
import { DatabaseModule } from '../database/database.module';
import { screenshotProvider } from '../screenshots/screenshots.provider';
import { screenshotCronJobsProvider } from '../screenshot-cron-jobs/screenshot-cron-jobs.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [MarketLinksController],
  providers: [
    MarketLinksService,
    ...marketLinkProvider,
    ...screenshotCronJobsProvider,
    ...screenshotProvider,
  ],
})
export class MarketLinksModule {}
