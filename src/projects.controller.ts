import { Controller, Get } from '@nestjs/common';
import { Project } from './entities/projects.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }
}
