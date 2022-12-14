import { Controller, Param, Body, Get, Post, Patch, Delete } from '@nestjs/common';
import { ObjectID } from 'mongodb';

import { ProjectsService } from './projects.service';

import { Project } from './projects.entity';
import { Anchor } from './anchor.entity';
import { Tag } from './tags.entity';

import { CreateProjectDto } from './dto/create-project.dto';
import { CreateAnchorDto } from './dto/create-anchor.dto';
import { CreateTagDto } from './dto/create-tag.dto';

import { ParseObjectIdPipe } from 'src/common/pipes';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) { }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }

  @Patch(':projectId')
  async updateProject(
    @Param('projectId', ParseObjectIdPipe) projectId: ObjectID,
    @Body() createProjectDto: CreateProjectDto
  ) {
    return this.projectsService.updateProject(projectId, createProjectDto);
  }

  @Delete(':projectId')
  async deleteProject(@Param('projectId', ParseObjectIdPipe) projectId: ObjectID) {
    return this.projectsService.deleteProject(projectId);
  }

  @Get(':projectId/anchors')
  async getAnchors(@Param('projectId', ParseObjectIdPipe) projectId: ObjectID): Promise<Anchor[]> {
    return this.projectsService.getAnchors(projectId);
  }

  @Post(':projectId/anchors')
  async createAnchor(
    @Param('projectId', ParseObjectIdPipe) projectId: ObjectID,
    @Body() createAnchorDto: CreateAnchorDto
  ) {
    createAnchorDto.projectId = projectId;
    return this.projectsService.createAnchor(createAnchorDto);
  }

  @Patch(':projectId')
  async updateAnchor(
    @Param('projectId', ParseObjectIdPipe) projectId: ObjectID,
    @Param('anchorId', ParseObjectIdPipe) anchorId: ObjectID,
    @Body() createAnchorDto: CreateAnchorDto
  ) {
    createAnchorDto.projectId = projectId;
    return this.projectsService.updateAnchor(anchorId, createAnchorDto);
  }

  @Delete(':projectId/anchors/:anchorId')
  async deleteAnchor(@Param('anchorId', ParseObjectIdPipe) anchorId: ObjectID) {
    return this.projectsService.deleteAnchor(anchorId);
  }

  @Get(':projectId/tags')
  async getTags(@Param('projectId', ParseObjectIdPipe) projectId: ObjectID): Promise<Tag[]> {
    return this.projectsService.getTags(projectId);
  }

  @Post(':projectId/tags')
  async createTag(
    @Param('projectId', ParseObjectIdPipe) projectId: ObjectID,
    @Body() createTagDto: CreateTagDto
  ) {
    createTagDto.projectId = projectId;
    return this.projectsService.createTag(createTagDto);
  }

  @Delete(':projectId/tags/:tagId')
  async deleteTag(@Param('tagId', ParseObjectIdPipe) tagId: ObjectID) {
    return this.projectsService.deleteTag(tagId);
  }

  @Get(':projectId/colors')
  async getColors(@Param('projectId', ParseObjectIdPipe) projectId: ObjectID): Promise<string[]> {
    return this.projectsService.getColors(projectId);
  }

  @Get(':projectId/networkSsids')
  async getNetworkSsids(@Param('projectId', ParseObjectIdPipe) projectId: ObjectID): Promise<string[]> {
    return this.projectsService.getNetworkSsids(projectId);
  }
}
