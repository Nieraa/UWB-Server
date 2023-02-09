import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}