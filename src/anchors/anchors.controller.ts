import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards
} from '@nestjs/common';
import { CreateAnchorDto } from './dto/create-anchor-dto';
import { UpdateAnchorDto } from './dto/update-anchor-dto';
import { Anchor } from './anchors.entity';
import { AnchorsService } from './anchors.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller(':userId/projects/:projectId/roomPlans/:roomPlanId/anchors')
export class AnchorsController {
  constructor(private readonly anchorsService: AnchorsService) { }

  @Get()
  async getAnchors(
    @Param('roomPlanId') roomPlanId: string
    ): Promise<Anchor[]> {
    return this.anchorsService.getAnchors(roomPlanId);
  }

  @Post()
  async createAnchor(
    @Param('projectId') projectId: string,
    @Param('roomPlanId') roomPlanId: string,
    @Body() createAnchorDto: CreateAnchorDto
  ): Promise<string> {
    return this.anchorsService.createAnchor(projectId, roomPlanId, createAnchorDto);
  }

  @Patch(':anchorId')
  async updateAnchor(
    @Param('roomPlanId') roomPlanId: string,
    @Param('anchorId') anchorId: string,
    @Body() updateAnchorDto: UpdateAnchorDto
  ): Promise<void> {
    return this.anchorsService.updateAnchor(roomPlanId, anchorId, updateAnchorDto);
  }

  @Delete(':anchorId')
  async deleteAnchor(
    @Param('roomPlanId') roomPlanId: string,
    @Param('anchorId') anchorId: string
  ): Promise<void> {
    return this.anchorsService.deleteAnchor(roomPlanId, anchorId);
  }
}
