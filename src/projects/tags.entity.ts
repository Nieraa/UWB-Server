import { Entity, Column, ObjectIdColumn } from "typeorm";
import { ObjectID } from "mongodb";

@Entity()
export class Tag {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  projectId: ObjectID;

  @Column()
  name: string;

  @Column()
  ipAddress: string;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column()
  networkSsid: string;

  @Column()
  networkColor: string;
}