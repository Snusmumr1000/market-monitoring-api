import { Sequelize } from 'sequelize-typescript';
import { MarketLink } from '../market-links/entities/market-link.entity';
import { Screenshot } from '../screenshots/entities/screenshot.entity';
import { ScreenshotCronJob } from '../screenshot-cron-jobs/entities/screenshot-cron-job.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_URL,
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([MarketLink, Screenshot, ScreenshotCronJob]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
