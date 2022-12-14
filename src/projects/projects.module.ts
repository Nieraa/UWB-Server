import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProjectsController } from "./projects.controller";

import { ProjectsService } from "./projects.service";

import { Project } from "./projects.entity";
import { Anchor } from "./anchor.entity";
import { Tag } from "./tags.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Project, Anchor, Tag])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})

export class ProjectsModule {}