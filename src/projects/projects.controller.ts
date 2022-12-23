import { Body, Controller, Get, Post } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) { }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    if ((createProjectDto.projectName != undefined) && (createProjectDto.imgUrl != undefined)) {
      const newProject = this.projectsService.create(createProjectDto);
      return newProject;
    }
    else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
