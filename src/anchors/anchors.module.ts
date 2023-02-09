import { Module } from '@nestjs/common';
import { AnchorsController } from './anchors.controller';
import { AnchorsService } from './anchors.service';

@Module({
  imports: [],
  controllers: [AnchorsController],
  providers: [AnchorsService],
})
export class AnchorsModule {}
