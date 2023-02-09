import { IsOptional, IsString, IsNumber } from "class-validator";

export class UpdateAnchorDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  x: number;

  @IsOptional()
  @IsNumber()
  y: number;

  @IsOptional()
  @IsNumber()
  z: number;
}