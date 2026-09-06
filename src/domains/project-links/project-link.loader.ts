import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { ProjectLinksService } from './project-links.service';
import { LinkDto } from '@/shared/dto/link.dto';

@Injectable({ scope: Scope.REQUEST })
export class ProjectLinkLoader extends DataLoader<number, LinkDto | null> {
  constructor(projectLinksService: ProjectLinksService) {
    super(async (projectIds) => {
      const links = await projectLinksService.findByProjectIds(projectIds);

      const linksByProjectId = new Map(
        links.map((link) => [link.projectId, link]),
      );

      return projectIds.map(
        (projectId) => linksByProjectId.get(projectId) ?? null,
      );
    });
  }
}
