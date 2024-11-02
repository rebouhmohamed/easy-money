import { Injectable, NotFoundException  } from '@nestjs/common';
import { CreateCardDto } from './cards-dto';

@Injectable()
export class CardsService {
  private cards = [
    { id: 1, name: 'John Doe', title: 'Software Engineer', company: 'Tech Corp' },
    { id: 2, name: 'Jane Smith', title: 'Product Manager', company: 'Innovate Ltd' },
  ];

  findAll() {
    return this.cards;
  }
  findOneById(id: number) {
    const card = this.cards.findIndex((card) => card.id === id);
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    return card;
  }
  create(createCardDto: CreateCardDto) {
    const newCard = {
      id: this.cards.length + 1, // Simple id generation for demonstration
      ...createCardDto,
    };
    this.cards.push(newCard);
    return newCard;
  }
  delete(id: number) {
    const cardIndex = this.cards.findIndex((card) => card.id === id);
    if (cardIndex === -1) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    const deletedCard = this.cards.splice(cardIndex, 1);
    return deletedCard[0];
  }
  updateCard(id: number, updateData: any) {
    const card = this.cards.find((card) => card.id === id);
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    Object.assign(card, updateData);
    return card;
  }

  getCards(page: number, limit: number, search: string) {
    const filteredCards = this.cards.filter(card =>
      card.title.toLowerCase().includes(search.toLowerCase())
    );

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return {
      data: filteredCards.slice(startIndex, endIndex),
      total: filteredCards.length,
    };
  }

  getCardCount() {
    return { count: this.cards.length };
  }
}

