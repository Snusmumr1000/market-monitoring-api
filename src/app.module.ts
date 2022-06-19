import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketLinksModule } from './market-links/market-links.module';

@Module({
  imports: [MarketLinksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
