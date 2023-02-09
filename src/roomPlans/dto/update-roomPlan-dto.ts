import { IsString, IsNumber, IsPositive } from "class-validator";

export class UpdateRoomPlanDto {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsNumber()
  @IsPositive()
  xRatio: number;

  @IsNumber()
  @IsPositive()
  yRatio: number;

  @IsNumber()
  xOrigin: number;

  @IsNumber()
  yOrigin: number;
}