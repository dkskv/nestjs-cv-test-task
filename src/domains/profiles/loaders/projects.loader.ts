import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { ProjectDto } from '../../projects/projects.dto.js';
import { ProjectsService } from '../../projects/projects.service.js';
import { groupByToMap } from '../../../shared/lib/group-by-to-map.js';

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
