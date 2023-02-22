import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async validateUser(username: string, hashedPassword: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    if (user && user.hashedPassword === hashedPassword) {
      const { hashedPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async signin(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      id: user.id,
      username: user.username,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
