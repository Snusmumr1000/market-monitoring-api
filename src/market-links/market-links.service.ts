import { Inject, Injectable } from '@nestjs/common';
import { MarketLink } from './entities/market-link.entity';
import { MarketLinkRepositoryType } from './market-links.provider';
import { CreateMarketLinkDto } from './dto/create-market-link.dto';
import { ScreenshotCronJobRepositoryType } from '../screenshot-cron-jobs/screenshot-cron-jobs.provider';
import { ScreenshotRepositoryType } from '../screenshots/screenshots.provider';
import { Screenshot } from '../screenshots/entities/screenshot.entity';
import { ScreenshotCronJob } from '../screenshot-cron-jobs/entities/screenshot-cron-job.entity';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class MarketLinksService {
  constructor(
    @Inject(MarketLinkRepositoryType)
    private marketLinkRepository: typeof MarketLink,
    @Inject(ScreenshotCronJobRepositoryType)
    private screenshotCronJobRepository: typeof ScreenshotCronJob,
    @Inject(ScreenshotRepositoryType)
    private screenshotRepository: typeof Screenshot,
    private schedulerRegistry: SchedulerRegistry,
  ) {
    this.__init();
  }

  async __init() {
    const cronJobs = await this.screenshotCronJobRepository.findAll();
    cronJobs.forEach(this.__appendScreenshotCronJob);
  }

  async createMarketLink(
    marketLinkDto: CreateMarketLinkDto,
  ): Promise<MarketLink> {
    // TODO: use transaction
    const marketLink = await this.marketLinkRepository.create({
      ...marketLinkDto,
    });

    const cronJob = {
      schedule: CronExpression.EVERY_10_SECONDS,
      marketLinkId: marketLink.id,
    };
    const screenshotCronJob = await this.screenshotCronJobRepository.create(
      cronJob,
    );
    await this.__appendScreenshotCronJob(screenshotCronJob);

    return marketLink;
  }

  async __appendScreenshotCronJob(screenshotCronJob: ScreenshotCronJob) {
    const job = new CronJob(screenshotCronJob.schedule, () => {
      this.__takeScreenshotAndSave(screenshotCronJob.marketLinkId);
    });

    this.schedulerRegistry.addCronJob(
      `TakeScreenshot for link ${screenshotCronJob.marketLinkId}`,
      job,
    );

    job.start();
  }

  async __takeScreenshotAndSave(marketLinkId: number) {
    const screenshot = {
      marketLinkId,
      content:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
    };
    await this.screenshotRepository.create(screenshot);
  }
}
