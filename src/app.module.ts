import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { RoomPlansModule } from './roomPlans/roomPlans.module';
import { AnchorsModule } from './anchors/anchors.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), ProjectsModule, RoomPlansModule, AnchorsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
