import { Anchor } from "src/anchors/anchors.entity";

export class RoomPlan {
  id: string;
  name: string;
  image: File | string;
  xRatio: number;
  yRatio: number;
  xOrigin: number;
  yOrigin: number;
  anchors?: Anchor[];
}