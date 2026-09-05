import { Module } from '@nestjs/common';
import { ProjectLinksResolver } from './project-links.resolver';
import { ProjectLinksService } from './project-links.service';

@Module({
  providers: [ProjectLinksResolver, ProjectLinksService],
  exports: [ProjectLinksService],
})
export class ProjectLinksModule {}
