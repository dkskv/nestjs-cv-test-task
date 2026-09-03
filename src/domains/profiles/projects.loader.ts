import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { ProjectDto } from '@/domains/projects/projects.types';
import { ProjectsService } from '@/domains/projects/projects.service';
import { groupByToMap } from '@/shared/lib/group-by-to-map';

@Injectable({ scope: Scope.REQUEST })
export class ProjectsLoader extends DataLoader<number, ProjectDto[]> {
  constructor(projectsService: ProjectsService) {
    super(async (profileIds) => {
      const projects = await projectsService.findByProfileIds(profileIds);

      const projectsByProfileId = groupByToMap(
        projects,
        (project) => project.profileId,
      );

      return profileIds.map(
        (profileId) => projectsByProfileId.get(profileId) ?? [],
      );
    });
  }
}
