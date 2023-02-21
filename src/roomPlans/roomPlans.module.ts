import { Module } from '@nestjs/common';
import { RoomPlansController } from './roomPlans.controller';
import { RoomPlansService } from './roomPlans.service';

@Module({
  controllers: [RoomPlansController],
  providers: [RoomPlansService],
})
export class RoomPlansModule {}
