import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { UsersModule } from './users/users.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [CardsModule, UsersModule, StoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
