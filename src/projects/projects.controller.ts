import { Body, ConsoleLogger, Controller, Get, Param, Post } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';
import { Anchor } from './anchor.entity';
import { Tag } from './tags.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) { }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    if ((createProjectDto.projectName !== undefined) && (createProjectDto.imgUrl !== undefined)) {
      const newProject = this.projectsService.create(createProjectDto);
      return newProject;
    }
    else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':projectId/anchors')
  async getAnchors(@Param('projectId') projectId: string): Promise<Anchor[]> {
    return this.projectsService.getAnchors(projectId);
  }

  @Get(':projectId/tags')
  async getTags(@Param('projectId') projectId: string): Promise<Tag[]> {
    return this.projectsService.getTags(projectId);
  }
}
