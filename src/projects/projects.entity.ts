import { Entity, Column, ObjectIdColumn } from "typeorm";
import { ObjectID } from "mongodb";

@Entity()
export class Project {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  projectName: string;

  @Column()
  imgUrl: string;

  @Column()
  l: number;

  @Column()
  w: number;
}