import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { MarketLinksService } from './market-links.service';
import { CreateMarketLinkDto } from './dto/create-market-link.dto';
import { GetMarketLinkDto } from './dto/get-market-link.dto';
import { UpdateMarketLinkDto } from './dto/update-market-link.dto';

@Controller('market-links')
export class MarketLinksController {
  constructor(private readonly marketLinksService: MarketLinksService) {}

  @Post()
  create(@Body() createMarketLinkDto: CreateMarketLinkDto) {
    return `This action adds a new cat: ${JSON.stringify(createMarketLinkDto)}`;
  }

  @Get()
  findAll(): GetMarketLinkDto[] {
    return [
      {
        id: 1,
        url: 'https://www.google.com',
      },
    ];
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
