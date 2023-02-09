import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRoomPlanDto } from './dto/create-roomPlan-dto';
import { UpdateRoomPlanDto } from './dto/update-roomPlan-dto';
import { RoomPlan } from './roomPlans.entity';
import { RoomPlansService } from './roomPlans.service';

@Controller('projects/:projectId/roomPlans')
export class RoomPlansController {
  constructor(private readonly roomPlansService: RoomPlansService) { }

  @Get()
  async getRoomPlans(@Param('projectId') projectId: string): Promise<RoomPlan[]> {
    return this.roomPlansService.getRoomPlans(projectId);
  }

  @Post()
  async createRoomPlan(
    @Param('projectId') projectId: string,
    @Body() createRoomPlanDto: CreateRoomPlanDto
  ): Promise<string> {
    return this.roomPlansService.createRoomPlan(projectId, createRoomPlanDto);
  }

  @Patch(':roomPlanId')
  async updateRoomPlan(
    @Param('projectId') projectId: string,
    @Param('roomPlanId') roomPlanId: string,
    @Body() updateRoomPlanDto: UpdateRoomPlanDto
  ): Promise<void> {
    return this.roomPlansService.updateRoomPlan(projectId, roomPlanId, updateRoomPlanDto);
  }

  @Delete(':roomPlanId')
  async deleteRoomPlan(
    @Param('projectId') projectId: string,
    @Param('roomPlanId') roomPlanId: string
  ): Promise<void> {
    return this.roomPlansService.deleteRoomPlan(projectId, roomPlanId);
  }

  @Get(':roomPlanId')
  async getProjectbyId(
    @Param('projectId') projectId: string,
    @Param('roomPlanId') roomPlanId: string
    ): Promise<RoomPlan> {
    return this.roomPlansService.getRoomPlanbyId(projectId, roomPlanId);
  }
}
