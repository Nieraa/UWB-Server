import { RoomPlan } from "src/roomPlans/roomPlans.entity"; 

export class Project {
  id: string;
  name: string;
  roomPlans?: RoomPlan[];
}