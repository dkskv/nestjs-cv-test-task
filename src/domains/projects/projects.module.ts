import { Module } from '@nestjs/common';
import { ProjectLinksModule } from '@/domains/project-links/project-links.module';
import { ProjectLinkLoader } from '@/domains/project-links/project-link.loader';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';

@Module({
  imports: [ProjectLinksModule],
  providers: [ProjectsResolver, ProjectsService, ProjectLinkLoader],
  exports: [ProjectsService],
})
export class ProjectsModule {}
