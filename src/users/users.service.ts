import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto} from './users-dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', email: 'Software Engineer'  },
    { id: 2, name: 'Jane Smith', email: 'Product Manager' },
  ];

  findAll() {
    return this.users;
  }
  findOneById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
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
  updateUser(id: number, updateData: any) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateData);
    return user;
  }
  getUsers(page: number, limit: number, search: string) {
    const filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return {
      data: filteredUsers.slice(startIndex, endIndex),
      total: filteredUsers.length,
    };
  }
  getUserCount() {
    return { count: this.users.length };
  }
}


