import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ObjectID } from 'mongodb';

import { ProjectsService } from './projects.service';

import { Project } from './projects.entity';
import { Anchor } from './anchor.entity';
import { Tag } from './tags.entity';

import { CreateProjectDto } from './dto/create-project.dto';
import { CreateAnchorDto } from './dto/create-anchor.dto';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) { }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    if ((createProjectDto.projectName !== undefined) &&
      (createProjectDto.imgUrl !== undefined) &&
      (createProjectDto.l !== undefined) &&
      (createProjectDto.w !== undefined)) {
      const newProject = this.projectsService.createProject(createProjectDto);
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

  @Post(':projectId/anchors')
  async createAnchor(
    @Param('projectId') projectId: string,
    @Body() createAnchorDto: CreateAnchorDto
  ) {
    if ((createAnchorDto.name !== undefined) &&
      (createAnchorDto.ipAddress !== undefined) &&
      (createAnchorDto.x !== undefined) &&
      (createAnchorDto.y !== undefined) &&
      (createAnchorDto.networkSsid !== undefined) &&
      (createAnchorDto.networkColor !== undefined)) {
      createAnchorDto.projectId = new ObjectID(projectId);
      const newAnchor = this.projectsService.createAnchor(createAnchorDto);
      return newAnchor;
    }
    else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':projectId/tags')
  async getTags(@Param('projectId') projectId: string): Promise<Tag[]> {
    return this.projectsService.getTags(projectId);
  }

  @Post(':projectId/tags')
  async createTag(
    @Param('projectId') projectId: string,
    @Body() createTagDto: CreateTagDto
  ) {
    if ((createTagDto.name !== undefined) &&
      (createTagDto.ipAddress !== undefined) &&
      (createTagDto.x !== undefined) &&
      (createTagDto.y !== undefined) &&
      (createTagDto.networkSsid !== undefined) &&
      (createTagDto.networkColor !== undefined)) {
      createTagDto.projectId = new ObjectID(projectId);
      const newTag = this.projectsService.createTag(createTagDto);
      return newTag;
    }
    else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':projectId/colors')
  async getColors(@Param('projectId') projectId: string): Promise<string[]> {
    return this.projectsService.getColors(new ObjectID(projectId));
  }

  @Get(':projectId/networkSsids')
  async getNetworkSsids(@Param('projectId') projectId: string): Promise<string[]> {
    return this.projectsService.getNetworkSsids(new ObjectID(projectId));
  }
}
