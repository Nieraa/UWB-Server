import { IsString } from "class-validator";

export class UpdateProjectDto {
  @IsString()
  name: string;
}