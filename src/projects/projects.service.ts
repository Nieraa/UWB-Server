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

  async updateProjectName(
    projectId: string,
    updateProjectDto: UpdateProjectDto
  ): Promise<void> {
    const db = admin.database();
    const projectRef = db.ref(`/projects/${projectId}`);
    projectRef.update(updateProjectDto);
  }

  async deleteProject(projectId: string): Promise<void> {
    const db = admin.database();
    const projectRef = db.ref(`/projects/${projectId}`);
    projectRef.set({});
  }

  async getProjectbyId(projectId: string): Promise<Project> {
    const db = admin.database();
    const projectRef = db.ref(`/projects/${projectId}`);
    return await projectRef.once('value').then((projectSnapshot) => {
      const project: Project = projectSnapshot.val() !== null ? projectSnapshot.val() : {
        id: "",
        name: ""
      };
      delete project.roomPlans
      return project;
    });
  }
}
