import { Screenshot } from './entities/screenshot.entity';

export const ScreenshotRepositoryType = 'SCREENSHOT_REPOSITORY';

export const screenshotProvider = [
  {
    provide: ScreenshotRepositoryType,
    useValue: Screenshot,
  },
];
