import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { ObjectID } from 'mongodb';

export class CreateAnchorDto {
  projectId: ObjectID;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  ipAddress: string;

  @IsNotEmpty()
  @IsNumber()
  x: number;

  @IsNotEmpty()
  @IsNumber()
  y: number;

  @IsNotEmpty()
  @IsString()
  networkSsid: string;

  @IsNotEmpty()
  @IsString()
  networkColor: string;
}