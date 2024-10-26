import { Controller, Get,Body,Post, Delete, Param } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './store-dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  findAll() {
    return this.storesService.findAll();
  }
  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.storesService.delete(Number(id));
  }
}
