import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, hashedPassword: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    if (user && user.hashedPassword === hashedPassword) {
      const { hashedPassword, ...result } = user;
      return result;
    }
    return null;
  }
}
