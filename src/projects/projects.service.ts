import { Injectable } from "@nestjs/common";
import { Project } from "./projects.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProjectDto } from "./dto/create-project.dto";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>
  ) { }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async create(createProjectDto: CreateProjectDto) {
    return this.projectsRepository.save(createProjectDto);
  }
}