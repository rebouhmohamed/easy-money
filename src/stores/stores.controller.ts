import { Controller, Get,Body,Post, Delete, Param, Query, Patch } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './store-dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  findAll() {
    return this.storesService.findAll();
  }
  @Get(':id')
  getOneById(@Param('id') id: number) {
    return this.storesService.findOneById(id);
  }
  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.storesService.delete(Number(id));
  }
  @Patch(':id')
  updateStore(@Param('id') id: number, @Body() updateData: any) {
    return this.storesService.updateStore(id, updateData);
  }

  @Get()
  getStores(@Query('page') page = 1, @Query('limit') limit = 10, @Query('search') search = '') {
    return this.storesService.getStores(page, limit, search);
  }

  @Get('count')
  getStoreCount() {
    return this.storesService.getStoreCount();
  }
}
