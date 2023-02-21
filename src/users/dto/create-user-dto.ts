import { IsLowercase, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsLowercase()
  username: string;

  @IsNotEmpty()
  @IsString()
  hashedPassword: string;
}