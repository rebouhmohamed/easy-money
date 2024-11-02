import { Controller, Get,Body,Post, Delete, Param, Query, Patch } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './cards-dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }
  @Get(':id')
  getOneById(@Param('id') id: string) {
    return this.cardsService.findOneById(Number(id));
  }
  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.cardsService.delete(Number(id));
  }
  @Patch(':id')
  updateCard(@Param('id') id: number, @Body() updateData: any) {
    return this.cardsService.updateCard(id, updateData);
  }

  @Get()
  getCards(@Query('page') page = 1, @Query('limit') limit = 10, @Query('search') search = '') {
    return this.cardsService.getCards(page, limit, search);
  }

  @Get('count')
  getCardCount() {
    return this.cardsService.getCardCount();
  }
}
