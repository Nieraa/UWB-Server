import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";

export type User = any;

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('usernames')
  async getUsernames(): Promise<string[]> {
    return this.usersService.getUsernames();
  }
}