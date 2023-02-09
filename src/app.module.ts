import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { RoomPlansModule } from './roomPlans/roomPlans.module';
import { AnchorsModule } from './anchors/anchors.module';

@Module({
  imports: [ConfigModule.forRoot(), ProjectsModule, RoomPlansModule, AnchorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
