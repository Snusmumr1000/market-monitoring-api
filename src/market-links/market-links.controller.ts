import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { MarketLinksService } from './market-links.service';
import { CreateMarketLinkDto } from './dto/create-market-link.dto';
import { GetMarketLinkDto } from './dto/get-market-link.dto';
import { UpdateMarketLinkDto } from './dto/update-market-link.dto';
import { MarketLink } from './entities/market-link.entity';
import { MarketLinkRepositoryType } from './market-links.provider';
import { ApiResponse } from '@nestjs/swagger';
import { ScreenshotRepositoryType } from '../screenshots/screenshots.provider';
import { Screenshot } from '../screenshots/entities/screenshot.entity';
import { GetScreenshotDto } from '../screenshots/dto/get-screenshot.dto';

@Controller('market-links')
export class MarketLinksController {
  constructor(
    private readonly marketLinksService: MarketLinksService,

    @Inject(MarketLinkRepositoryType)
    private marketLinkRepository: typeof MarketLink,

    @Inject(ScreenshotRepositoryType)
    private screenshotRepository: typeof Screenshot,
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: GetMarketLinkDto,
  })
  async create(@Body() createMarketLinkDto: CreateMarketLinkDto) {
    return this.marketLinksService.createMarketLink(createMarketLinkDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetMarketLinkDto,
    isArray: true,
  })
  async findAll() {
    return this.marketLinkRepository.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetMarketLinkDto,
  })
  async findOne(@Param('id') id: number) {
    return this.marketLinkRepository.findOne({
      where: { id },
    });
  }

  @Get(':id/screenshots')
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetScreenshotDto,
    isArray: true,
  })
  async getScreenshots(@Param('id') id: number) {
    return await this.screenshotRepository.findAll({
      where: { marketLinkId: id },
    });
  }

  @Put()
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async update(@Body() updateMarketLinkDto: UpdateMarketLinkDto) {
    await this.marketLinkRepository.update(updateMarketLinkDto, {
      where: { id: updateMarketLinkDto.id },
    });
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async remove(@Param('id') id: number) {
    await this.marketLinkRepository.destroy({ where: { id } });
  }
}
