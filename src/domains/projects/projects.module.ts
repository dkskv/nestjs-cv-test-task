import { Module } from '@nestjs/common';
import { ProjectLinksModule } from './../project-links/project-links.module.js';
import { ProjectLinkLoader } from './../project-links/project-link.loader.js';
import { ProjectsResolver } from './projects.resolver.js';
import { ProjectsService } from './projects.service.js';

@Module({
  imports: [ProjectLinksModule],
  providers: [ProjectsResolver, ProjectsService, ProjectLinkLoader],
  exports: [ProjectsService],
})
export class ProjectsModule {}
