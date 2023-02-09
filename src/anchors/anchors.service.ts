import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateAnchorDto } from './dto/create-anchor-dto';
import { UpdateAnchorDto } from './dto/update-anchor-dto';
import { Anchor } from './anchors.entity';

@Injectable()
export class AnchorsService {
  async getAnchors(
    projectId: string,
    roomPlanId: string
    ): Promise<Anchor[]> {
    const db = admin.database();
    const anchorsRef = db.ref(`/projects/${projectId}/roomPlans/${roomPlanId}/anchors`);
    return await anchorsRef.once('value').then((anchorsSnapshot) => {
      const anchors: Anchor[] = anchorsSnapshot.val() !== null ? Object.values(anchorsSnapshot.val()) : [];
      return anchors;
    });
  }

  async createAnchor(
    projectId: string,
    roomPlanId: string,
    createAnchorDto: CreateAnchorDto
  ): Promise<string> {
    const db = admin.database();
    const anchorsRef = db.ref(`/projects/${projectId}/roomPlans/${roomPlanId}/anchors`);
    const key = anchorsRef.push(createAnchorDto).key;
    const newAnchorRef = db.ref(`/projects/${projectId}/roomPlans/${roomPlanId}/anchors/${key}`)
    newAnchorRef.update({ id: key });
    return key;
  }

  async updateAnchor(
    projectId: string,
    roomPlanId: string,
    anchorId: string,
    updateAnchorDto: UpdateAnchorDto
  ): Promise<void> {
    const db = admin.database();
    const anchorRef = db.ref(`/projects/${projectId}/roomPlans/${roomPlanId}/anchors/${anchorId}`);
    anchorRef.update(updateAnchorDto);
  }

  async deleteAnchor(
    projectId: string,
    roomPlanId: string,
    anchorId: string
  ): Promise<void> {
    const db = admin.database();
    const anchorRef = db.ref(`/projects/${projectId}/roomPlans/${roomPlanId}/anchors/${anchorId}`);
    anchorRef.set({});
  }
}
