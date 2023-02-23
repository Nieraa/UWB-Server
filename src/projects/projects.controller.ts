import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProjectDto } from './dto/create-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { Project } from './projects.entity';
import { ProjectsService } from './projects.service';

@UseGuards(JwtAuthGuard)
@Controller(':userId/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Get()
  async getProjects(@Param('userId') userId: string): Promise<Project[]> {
    return this.projectsService.getProjects(userId);
  }

  @Post()
  async createProject(
    @Param('userId') userId: string,
    @Body() createProjectDto: CreateProjectDto
  ): Promise<string> {
    return this.projectsService.createProject(userId, createProjectDto);
  }

  @Patch(':projectId')
  async updateProject(
    @Param('userId') userId: string,
    @Param('projectId') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto
  ): Promise<void> {
    return this.projectsService.updateProject(userId, projectId, updateProjectDto);
  }

  @Delete(':projectId')
  async deleteProject(
    @Param('userId') userId: string,
    @Param('projectId') projectId: string
  ): Promise<void> {
    return this.projectsService.deleteProject(userId, projectId);
  }

  @Get(':projectId')
  async getProjectbyId(
    @Param('userId') userId: string,
    @Param('projectId') projectId: string
  ): Promise<Project> {
    return this.projectsService.getProjectbyId(userId ,projectId);
  }
}
