import { Module } from '@nestjs/common';
import { ProjectLinksService } from './project-links.service';

@Module({
  providers: [ProjectLinksService],
  exports: [ProjectLinksService],
})
export class ProjectLinksModule {}
