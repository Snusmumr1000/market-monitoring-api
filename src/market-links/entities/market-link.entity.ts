import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Screenshot } from './screenshot.entity';
import { ScreenshotCronJob } from './screenshot-cron-job.entity';

@Table
export class MarketLink extends Model {
  @Column
  url: string;

  @HasMany(() => Screenshot)
  screenshots: Screenshot[];

  @HasMany(() => ScreenshotCronJob)
  screenshotCronJobs: ScreenshotCronJob[];
}
