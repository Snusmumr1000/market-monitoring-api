import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Inject,
  HttpStatus,
} from '@nestjs/common';

import { MarketLinksService } from './market-links.service';
import { CreateMarketLinkDto } from './dto/create-market-link.dto';
import { GetMarketLinkDto } from './dto/get-market-link.dto';
import { UpdateMarketLinkDto } from './dto/update-market-link.dto';
import { MarketLink } from './entities/market-link.entity';
import { MarketLinkRepositoryType } from './market-links.provider';
import { ApiResponse } from '@nestjs/swagger';

@Controller('market-links')
export class MarketLinksController {
  constructor(
    private readonly marketLinksService: MarketLinksService,

    @Inject(MarketLinkRepositoryType)
    private marketLinkRepository: typeof MarketLink,
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
