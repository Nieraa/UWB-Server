import { ObjectID } from 'mongodb';

export class CreateTagDto {
  projectId: ObjectID;
  name: string;
  ipAddress: string;
  x: number;
  y: number;
  networkSsid: string;
  networkColor: string;
}