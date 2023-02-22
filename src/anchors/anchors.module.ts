import { Module } from '@nestjs/common';
import { RoomPlansModule } from 'src/roomPlans/roomPlans.module';
import { AnchorsController } from './anchors.controller';
import { AnchorsService } from './anchors.service';

@Module({
  imports: [RoomPlansModule],
  controllers: [AnchorsController],
  providers: [AnchorsService],
})
export class AnchorsModule {}
