import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { Project } from './projects.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getProjects(): Promise<Project[]> {
    return this.projectsService.getProjects();
  }

  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto): Promise<string> {
    return this.projectsService.createProject(createProjectDto);
  }

  @Patch(':projectId')
  async updateProjectName(
    @Param('projectId') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto
  ): Promise<void> {
    return this.projectsService.updateProjectName(projectId, updateProjectDto);
  }

  @Delete(':projectId')
  async deleteProject(@Param('projectId') projectId: string): Promise<void> {
    return this.projectsService.deleteProject(projectId);
  }

  @Get(':projectId')
  async getProjectbyId(@Param('projectId') projectId: string): Promise<Project> {
    return this.projectsService.getProjectbyId(projectId);
  }
}
