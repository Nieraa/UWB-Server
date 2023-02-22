import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateAnchorDto } from './dto/create-anchor-dto';
import { UpdateAnchorDto } from './dto/update-anchor-dto';
import { Anchor } from './anchors.entity';
import { Reference } from 'firebase-admin/database';
import { RoomPlansService } from 'src/roomPlans/roomPlans.service';

@Injectable()
export class AnchorsService {
  constructor(private readonly roomPlanService: RoomPlansService) {}

  async getAnchors(
    roomPlanId: string
    ): Promise<Anchor[]> {
    const db = admin.database();
    const anchorsRef = db.ref(`/roomPlan-anchors/${roomPlanId}`);
    return await anchorsRef.once('value').then((anchorsSnapshot) => {
      const anchors: Anchor[] = anchorsSnapshot.val() !== null ?
      Object.values(anchorsSnapshot.val())
      :
      [];
      return anchors;
    });
  }

  async createAnchor(
    projectId: string,
    roomPlanId: string,
    createAnchorDto: CreateAnchorDto
  ): Promise<string> {
    const db = admin.database();
    const roomPlanRef = db.ref(`/project-roomPlans/${projectId}/${roomPlanId}`);
    if (await this.roomPlanService.isHaveRoomPlan(roomPlanRef)) {
      const anchorsRef = db.ref(`/roomPlan-anchors/${roomPlanId}`);
      const key = anchorsRef.push(createAnchorDto).key;
      const newAnchorRef = db.ref(`/roomPlan-anchors/${roomPlanId}/${key}`)
      newAnchorRef.update({ id: key });
      return key;
    }
    return "Create Anchor failed";
  }

  async updateAnchor(
    roomPlanId: string,
    anchorId: string,
    updateAnchorDto: UpdateAnchorDto
  ): Promise<void> {
    const db = admin.database();
    const anchorRef = db.ref(`/roomPlan-anchors/${roomPlanId}/${anchorId}`);
    anchorRef.update(updateAnchorDto);
  }

  async deleteAnchor(
    roomPlanId: string,
    anchorId: string
  ): Promise<void> {
    const db = admin.database();
    const anchorRef = db.ref(`/roomPlan-anchors/${roomPlanId}/${anchorId}`);
    anchorRef.set({});
  }

  async isHaveAnchor(anchorRef: Reference): Promise<boolean> {
    return await anchorRef.once('value').then((anchorSnapshot) => {
      if (anchorSnapshot.val()) {
        return true;
      }
      else {
        return false;
      }
    });
  }
}
