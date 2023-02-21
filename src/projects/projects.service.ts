import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateProjectDto } from './dto/create-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { Project } from './projects.entity';

@Injectable()
export class ProjectsService {
  async getProjects(userId: string): Promise<Project[]> {
    const db = admin.database();
    const projectsRef = db.ref(`/user-projects/${userId}`);
    return await projectsRef.once('value').then((projectsSnapshot) => {
      const projects: Project[] = projectsSnapshot.val() !== null ?
        Object.values(projectsSnapshot.val())
        :
        [];
      return projects;
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
    projectRef.update(updateProjectDto);
  }

  async deleteProject(
    userId: string,
    projectId: string
  ): Promise<void> {
    const db = admin.database();
    const projectRef = db.ref(`/user-projects/${userId}/${projectId}`);
    projectRef.set({});
  }

  async getProjectbyId(
    userId: string,
    projectId: string
  ): Promise<Project> {
    const db = admin.database();
    const projectRef = db.ref(`/user-projects/${userId}/${projectId}`);
    return await projectRef.once('value').then((projectSnapshot) => {
      const project: Project = projectSnapshot.val() !== null ? projectSnapshot.val() : {
        id: "",
        name: ""
      };
      return project;
    });
  }
}
