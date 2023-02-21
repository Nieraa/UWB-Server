import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateRoomPlanDto } from './dto/create-roomPlan-dto';
import { UpdateRoomPlanDto } from './dto/update-roomPlan-dto';
import { RoomPlan } from './roomPlans.entity';

@Injectable()
export class RoomPlansService {
  async getRoomPlans(projectId: string): Promise<RoomPlan[]> {
    const db = admin.database();
    const roomPlansRef = db.ref(`/project-roomPlans/${projectId}`);
    return await roomPlansRef.once('value').then((roomPlansSnapshot) => {
      const roomPlans: RoomPlan[] = roomPlansSnapshot.val() !== null ? 
      Object.values(roomPlansSnapshot.val()) 
      : 
      [];
      return roomPlans;
    });
  }

  async createRoomPlan(
    projectId: string,
    createRoomPlanDto: CreateRoomPlanDto
  ): Promise<string> {
    const db = admin.database();
    const roomPlansRef = db.ref(`/project-roomPlans/${projectId}`);
    const key = roomPlansRef.push(createRoomPlanDto).key;
    const newRoomPlanRef = db.ref(`/project-roomPlans/${projectId}/${key}`);
    newRoomPlanRef.update({ id: key })
    return key;
  }

  async updateRoomPlan(
    projectId: string,
    roomPlanId: string,
    updateRoomPlanDto: UpdateRoomPlanDto
  ): Promise<void> {
    const db = admin.database();
    const roomPlanRef = db.ref(`/projects/${projectId}/roomPlans/${roomPlanId}`);
    roomPlanRef.update(updateRoomPlanDto);
  }

  async deleteRoomPlan(
    projectId: string,
    roomPlanId: string
  ): Promise<void> {
    const db = admin.database();
    const roomPlanRef = db.ref(`/projects/${projectId}/roomPlans/${roomPlanId}`);
    roomPlanRef.set({});
  }

  async getRoomPlanbyId(
    projectId: string,
    roomPlanId: string
  ): Promise<RoomPlan> {
    const db = admin.database();
    const roomPlanRef = db.ref(`/projects/${projectId}/roomPlans/${roomPlanId}`);
    return await roomPlanRef.once('value').then((roomPlanSnapshot) => {
      const roomPlan: RoomPlan = roomPlanSnapshot.val() !== null ? roomPlanSnapshot.val() : {
        id: "",
        name: "",
        image: "",
        xRatio: 0,
        yRatio: 0,
        xOrigin: 0,
        yOrigin: 0
      };
      delete roomPlan.anchors
      return roomPlan;
    });
  }
}
