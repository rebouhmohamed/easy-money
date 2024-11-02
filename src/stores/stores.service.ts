import { Injectable, NotFoundException  } from '@nestjs/common';
import { CreateStoreDto } from './store-dto';

@Injectable()
export class StoresService {
  private stores = [
    { id: 1, name: 'John Doe', location: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', location: 'Product Manager' },
  ];

  findAll() {
    return this.stores;
  }
  findOneById(id: number) {
    const store = this.stores.find((store) => store.id === id);
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    return store;
  }
  create(createStoreDto: CreateStoreDto) {
    const newStore = {
      id: this.stores.length + 1, // Simple id generation for demonstration
      ...createStoreDto,
    };
    this.stores.push(newStore);
    return newStore;
  }
  delete(id: number) {
    const storeIndex = this.stores.findIndex((store) => store.id === id);
    if (storeIndex === -1) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    const deletedStore = this.stores.splice(storeIndex, 1);
    return deletedStore[0];
  }
  updateStore(id: number, updateData: any) {
    const store = this.stores.find((store) => store.id === id);
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    Object.assign(store, updateData);
    return store;
  }

  getStores(page: number, limit: number, search: string) {
    const filteredStores = this.stores.filter(store =>
      store.name.toLowerCase().includes(search.toLowerCase())
    );

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return {
      data: filteredStores.slice(startIndex, endIndex),
      total: filteredStores.length,
    };
  }

  getStoreCount() {
    return { count: this.stores.length };
  }
}

