import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectID } from "mongodb";

import { Project } from "./projects.entity";
import { Anchor } from "./anchor.entity";
import { Tag } from "./tags.entity";

import { CreateProjectDto } from "./dto/create-project.dto";
import { CreateAnchorDto } from "./dto/create-anchor.dto";
import { CreateTagDto } from "./dto/create-tag.dto";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,

    @InjectRepository(Anchor)
    private anchorsRepository: Repository<Anchor>,

    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>
  ) { }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async createProject(createProjectDto: CreateProjectDto) {
    return this.projectsRepository.save(createProjectDto);
  }

  async getAnchors(projectId: ObjectID): Promise<Anchor[]> {
    return this.anchorsRepository.find({ where: { projectId: projectId } });
  }

  async createAnchor(createAnchorDto: CreateAnchorDto) {
    return this.anchorsRepository.save(createAnchorDto);
  }

  async getTags(projectId: ObjectID): Promise<Tag[]> {
    return this.tagsRepository.find({ where: { projectId: projectId } });
  }

  async createTag(createTagDto: CreateTagDto) {
    return this.tagsRepository.save(createTagDto);
  }

  async getColors(projectId: ObjectID): Promise<string[]> {
    const anchors = this.anchorsRepository.find({ where: { projectId: projectId } });
    const tags = this.tagsRepository.find({ where: { projectId: projectId } });
    const anchorColors = (await anchors).map((element: Anchor) => element.networkColor);
    const tagColors = (await tags).map((element: Tag) => element.networkColor);

    return [...new Set([...anchorColors, ...tagColors])];
  }

  async getNetworkSsids(projectId: ObjectID): Promise<string[]> {
    const anchors = this.anchorsRepository.find({ where: { projectId: projectId } });
    const tags = this.tagsRepository.find({ where: { projectId: projectId } });
    const anchorNetworkSsids = (await anchors).map((element: Anchor) => element.networkSsid);
    const tagNetworkSsids = (await tags).map((element: Tag) => element.networkSsid);

    return [...new Set([...anchorNetworkSsids, ...tagNetworkSsids])];
  }
}