import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Reference } from 'firebase-admin/database';
import { CreateProjectDto } from './dto/create-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { Project } from './projects.entity';

@Injectable()
export class ProjectsService {
  async getProjects(userId: string): Promise<Project[]> {
    const db = admin.database();
    const projectsRef = db.ref(`/user-projects/${userId}`);
    return await projectsRef.once('value').then((projectsSnapshot) => {
      if (projectsSnapshot.val()) {
        return Object.values(projectsSnapshot.val())
      }
      else { return [] }
    });
  }

  async createProject(
    userId: string,
    createProjectDto: CreateProjectDto
  ): Promise<string> {
    const db = admin.database();
    const projectsRef = db.ref(`/user-projects/${userId}`);
    const key = projectsRef.push(createProjectDto).key;
    const newProjectRef = db.ref(`/user-projects/${userId}/${key}`);
    newProjectRef.update({ id: key })
    return key;
  }

  async updateProject(
    userId: string,
    projectId: string,
    updateProjectDto: UpdateProjectDto
  ): Promise<void> {
    const db = admin.database();
    const projectRef = db.ref(`/user-projects/${userId}/${projectId}`);
    if (await this.isHaveProject(projectRef)) {
      projectRef.update(updateProjectDto);
    }
    else {
      throw new NotFoundException();
    }
  }

  async deleteProject(
    userId: string,
    projectId: string
  ): Promise<void> {
    const db = admin.database();
    const projectRef = db.ref(`/user-projects/${userId}/${projectId}`);
    const roomPlansRef = db.ref(`/project-roomPlans/${projectId}`);
    const ids: string[] = await roomPlansRef.once('value').then((roomPlansSnapshot) => {
      const roomPlanIds: string[] = roomPlansSnapshot.val() !== null ?
        Object.keys(roomPlansSnapshot.val())
        :
        [];
      return roomPlanIds;
    });
    projectRef.set({});
    roomPlansRef.set({});
    for (let i = 0; i < ids.length; i++) {
      const anchorsRef = db.ref(`/roomPlan-anchors/${ids[i]}`);
      anchorsRef.set({});
    }
  }

  async getProjectbyId(
    userId: string,
    projectId: string
  ): Promise<Project> {
    const db = admin.database();
    const projectRef = db.ref(`/user-projects/${userId}/${projectId}`);
    return await projectRef.once('value').then((projectSnapshot) => {
      if (projectSnapshot.val()) {
        return projectSnapshot.val();
      }
      else {
        throw new NotFoundException();
      }
    });
  }

  async isHaveProject(projectRef: Reference): Promise<boolean> {
    return projectRef.once('value').then((projectSnapshot) => {
      if (projectSnapshot.val()) {
        return true;
      }
      else {
        return false;
      }
    });
  }
}
