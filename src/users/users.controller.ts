import { Controller, Get, Post, Body } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user-dto";
import { UsersService } from "./users.service";

export type User = any;

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('usernames')
  async getUsernames(): Promise<string[]> {
    return this.usersService.getUsernames();
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.usersService.signup(createUserDto);
  }
}