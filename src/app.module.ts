import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketLinksModule } from './market-links/market-links.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MarketLinksModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
