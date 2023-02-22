import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Reference } from 'firebase-admin/database';
import { ProjectsService } from 'src/projects/projects.service';
import { CreateRoomPlanDto } from './dto/create-roomPlan-dto';
import { UpdateRoomPlanDto } from './dto/update-roomPlan-dto';
import { RoomPlan } from './roomPlans.entity';

@Injectable()
export class RoomPlansService {
  constructor(private readonly projectService: ProjectsService) {}
  async getRoomPlans(projectId: string): Promise<RoomPlan[]> {
    const db = admin.database();
    const roomPlansRef = db.ref(`/project-roomPlans/${projectId}`);
    return await roomPlansRef.once('value').then((roomPlansSnapshot) => {
      if (roomPlansSnapshot.val()) {
        return Object.values(roomPlansSnapshot.val())
      }
      else { return [] }
    });
  }

  async createRoomPlan(
    userId: string,
    projectId: string,
    createRoomPlanDto: CreateRoomPlanDto
  ): Promise<string> {
    const db = admin.database();
    const projectRef = db.ref(`/user-projects/${userId}/${projectId}`);
    if (await this.projectService.isHaveProject(projectRef)) {
      const roomPlansRef = db.ref(`/project-roomPlans/${projectId}`);
      const key = roomPlansRef.push(createRoomPlanDto).key;
      const newRoomPlanRef = db.ref(`/project-roomPlans/${projectId}/${key}`);
      newRoomPlanRef.update({ id: key })
      return key;
    }
    else {
      throw new NotFoundException();
    }
  }

  async updateRoomPlan(
    projectId: string,
    roomPlanId: string,
    updateRoomPlanDto: UpdateRoomPlanDto
  ): Promise<void> {
    const db = admin.database();
    const roomPlanRef = db.ref(`/project-roomPlans/${projectId}/${roomPlanId}`);
    if (await this.isHaveRoomPlan(roomPlanRef)) {
      roomPlanRef.update(updateRoomPlanDto);
    }
    else {
      throw new NotFoundException();
    }
  }

  async deleteRoomPlan(
    projectId: string,
    roomPlanId: string
  ): Promise<void> {
    const db = admin.database();
    const roomPlanRef = db.ref(`/project-roomPlans/${projectId}/${roomPlanId}`);
    const anchorsRef = db.ref(`/roomPlan-anchors/${roomPlanId}`);
    roomPlanRef.set({});
    anchorsRef.set({});
  }

  async getRoomPlanbyId(
    projectId: string,
    roomPlanId: string
  ): Promise<RoomPlan> {
    const db = admin.database();
    const roomPlanRef = db.ref(`/project-roomPlans/${projectId}/${roomPlanId}`);
    return await roomPlanRef.once('value').then((roomPlanSnapshot) => {
      if (roomPlanSnapshot.val()) {
        return roomPlanSnapshot.val();
      }
      else {
        throw new NotFoundException();
      }
    });
  }

  async isHaveRoomPlan(roomPlanRef: Reference): Promise<boolean> {
    return await roomPlanRef.once('value').then((roomPlanSnapshot) => {
      if (roomPlanSnapshot.val()) {
        return true;
      }
      else {
        return false;
      }
    });
  }
}
