import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  projectName: string;

  @IsNotEmpty()
  @IsString()
  imgUrl: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  l: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  w: number;
}