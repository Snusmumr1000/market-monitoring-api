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
import puppeteer from 'puppeteer';

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
    this.initCronJobs();
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
    await this.appendScreenshotCronJob(screenshotCronJob);

    await this.takeScreenshotAndSave(marketLink.id);

    return marketLink;
  }

  async deleteMarketLink(marketLinkId: number) {
    const marketLink = await this.marketLinkRepository.findOne({
      where: { id: marketLinkId },
      include: ScreenshotCronJob,
    });
    marketLink.screenshotCronJobs.forEach((screenshotCronJob) => {
      this.removeScreenshotCronJob(screenshotCronJob.id);
    });

    await this.marketLinkRepository.destroy({
      where: { id: marketLinkId },
    });
    await this.screenshotCronJobRepository.destroy({
      where: { marketLinkId },
    });
  }

  private async initCronJobs() {
    const cronJobs = await this.screenshotCronJobRepository.findAll();
    cronJobs.forEach((cronJob) => {
      this.appendScreenshotCronJob(cronJob);
    });
  }

  private async appendScreenshotCronJob(screenshotCronJob: ScreenshotCronJob) {
    const job = new CronJob(screenshotCronJob.schedule, () => {
      this.takeScreenshotAndSave(screenshotCronJob.marketLinkId);
    });

    this.schedulerRegistry.addCronJob(`${screenshotCronJob.id}`, job);

    job.start();
  }

  private async removeScreenshotCronJob(screenshotCronJobId: number) {
    this.schedulerRegistry.deleteCronJob(`${screenshotCronJobId}`);
  }

  private async takeScreenshotAndSave(marketLinkId: number) {
    const marketLink = await this.marketLinkRepository.findOne({
      where: { id: marketLinkId },
    });
    const screenshotBase64 = await MarketLinksService.takeScreenshotAsBase64(
      marketLink.url,
    );
    const screenshot = {
      marketLinkId,
      content: screenshotBase64,
    };
    await this.screenshotRepository.create(screenshot);
  }

  private static async takeScreenshotAsBase64(marketLinkUrl: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(marketLinkUrl);
    const screenshotBase64 = await page
      .screenshot({ encoding: 'base64' })
      .then((data) => {
        return `data:image/png;base64,${data}`;
      });
    await browser.close();
    return screenshotBase64;
  }
}
