import { IsNotEmpty, IsString, IsNumber, IsPositive } from "class-validator";

export class CreateRoomPlanDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  xRatio: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  yRatio: number;

  @IsNotEmpty()
  @IsNumber()
  xOrigin: number;
  
  @IsNotEmpty()
  @IsNumber()
  yOrigin: number;
}