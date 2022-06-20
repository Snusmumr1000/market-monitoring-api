import { ScreenshotCronJob } from './entities/screenshot-cron-job.entity';

export const ScreenshotCronJobRepositoryType = 'SCREENSHOT_CRON_JOB_REPOSITORY';

export const screenshotCronJobsProvider = [
  {
    provide: ScreenshotCronJobRepositoryType,
    useValue: ScreenshotCronJob,
  },
];
