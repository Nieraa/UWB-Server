import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProjectDto } from "./dto/create-project.dto";
import { Project } from "./projects.entity";
import { Anchor } from "./anchor.entity";
import { Tag } from "./tags.entity";

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

  async create(createProjectDto: CreateProjectDto) {
    return this.projectsRepository.save(createProjectDto);
  }

  async getAnchors(projectId: string): Promise<Anchor[]> {
    return this.anchorsRepository.find({ where: { projectId: projectId } });
  }

  async getTags(projectId: string): Promise<Tag[]> {
    return this.tagsRepository.find({ where: { projectId: projectId } });
  }
}