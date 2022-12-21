import { Entity, Column, ObjectIdColumn } from "typeorm";
import { ObjectID } from "mongodb";

@Entity()
export class Project {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  imgUrl: string;
}