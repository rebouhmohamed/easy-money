import { Controller, Get,Body,Post, Delete, Param } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './cards-dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }
  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.cardsService.delete(Number(id));
  }
}
