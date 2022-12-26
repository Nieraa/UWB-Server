import { ObjectID } from 'mongodb';

export class CreateAnchorDto {
  projectId: ObjectID;
  name: string;
  ipAddress: string;
  x: number;
  y: number;
  networkSsid: string;
  networkColor: string;
}