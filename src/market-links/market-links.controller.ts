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
} from '@nestjs/common';

import { MarketLinksService } from './market-links.service';
import { CreateMarketLinkDto } from './dto/create-market-link.dto';
import { GetMarketLinkDto } from './dto/get-market-link.dto';
import { UpdateMarketLinkDto } from './dto/update-market-link.dto';
import { MarketLink } from './entities/market-link.entity';
import { MarketLinkRepositoryType } from './market-links.provider';

@Controller('market-links')
export class MarketLinksController {
  constructor(
    private readonly marketLinksService: MarketLinksService,

    @Inject(MarketLinkRepositoryType)
    private marketLinkRepository: typeof MarketLink,
  ) {}

  @Post()
  create(@Body() createMarketLinkDto: CreateMarketLinkDto) {
    return this.marketLinkRepository.create({
      ...createMarketLinkDto,
    });
  }

  @Get()
  async findAll(): Promise<GetMarketLinkDto[]> {
    return (await this.marketLinkRepository.findAll()) as GetMarketLinkDto[];
  }

  @Get(':id')
  findOne(@Param('id') id: number): GetMarketLinkDto {
    return {
      id,
      url: 'https://www.google.com' + this.marketLinksService.getHello(),
    };
  }

  @Put(':id')
  update(@Body() updateMarketLinkDto: UpdateMarketLinkDto) {
    return `This action updates a #${updateMarketLinkDto.id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return `This action removes a #${id} cat`;
  }
}
