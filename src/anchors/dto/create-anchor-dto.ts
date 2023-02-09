import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateAnchorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  x: number;
  
  @IsNotEmpty()
  @IsNumber()
  y: number;

  @IsNotEmpty()
  @IsNumber()
  z: number;
}