import { Inject, Injectable } from '@nestjs/common';
import { MarketLink } from './entities/market-link.entity';
import { MarketLinkRepositoryType } from './market-links.provider';
import { CreateMarketLinkDto } from './dto/create-market-link.dto';
import { DatabaseModule } from '../database/database.module';
import { ScreenshotCronJobRepositoryType } from '../screenshot-cron-jobs/screenshot-cron-jobs.provider';
import { ScreenshotRepositoryType } from '../screenshots/screenshots.provider';
import { Screenshot } from '../screenshots/entities/screenshot.entity';
import { ScreenshotCronJob } from '../screenshot-cron-jobs/entities/screenshot-cron-job.entity';

@Injectable()
export class MarketLinksService {
  constructor(
    @Inject(MarketLinkRepositoryType)
    private marketLinkRepository: typeof MarketLink,
    @Inject(ScreenshotCronJobRepositoryType)
    private screenshotCronJobRepository: typeof ScreenshotCronJob,
    @Inject(ScreenshotRepositoryType)
    private screenshotRepository: typeof Screenshot,
  ) {}

  async createMarketLink(
    marketLinkDto: CreateMarketLinkDto,
  ): Promise<MarketLink> {
    // TODO: use transaction
    const marketLink = await this.marketLinkRepository.create({
      ...marketLinkDto,
    });
    const cronJob = {
      schedule: 'test',
      marketLinkId: marketLink.id,
    };
    const screenshot = {
      marketLinkId: marketLink.id,
      content: 'test',
    };

    await Promise.all([
      this.screenshotRepository.create(screenshot),
      this.screenshotCronJobRepository.create(cronJob),
    ]);

    return marketLink;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
