import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto} from './users-dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', email: 'Software Engineer', age: 26 },
    { id: 2, name: 'Jane Smith', email: 'Product Manager', age: 26 },
  ];

  findAll() {
    return this.users;
  }
  create(createUsersDto: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1, // Simple id generation for demonstration
      ...createUsersDto,
    };
    this.users.push(newUser);
    return newUser;
  }
  delete(id: number) {
    const cardIndex = this.users.findIndex((user) => user.id === id);
    if (cardIndex === -1) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    const deletedCard = this.users.splice(cardIndex, 1);
    return deletedCard[0];
  }
}


