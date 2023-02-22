import { Module } from '@nestjs/common';
import { ProjectsModule } from 'src/projects/projects.module';
import { RoomPlansController } from './roomPlans.controller';
import { RoomPlansService } from './roomPlans.service';

@Module({
  imports: [ProjectsModule],
  controllers: [RoomPlansController],
  providers: [RoomPlansService],
  exports: [RoomPlansService]
})
export class RoomPlansModule {}
