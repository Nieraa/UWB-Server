import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsModule } from './projects/projects.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { Project } from './projects/projects.entity';
import { Anchor } from './projects/anchor.entity';
import { Tag } from './projects/tags.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'uwb',
      entities: [Project, Anchor, Tag],
      synchronize: true,
    }),
    
    ProjectsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
