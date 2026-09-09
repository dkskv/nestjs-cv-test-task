import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { LinkDto } from '../../shared/dto/link.dto.js';
import { ProjectLinkLoader } from '../project-links/project-link.loader.js';
import { ProjectDto } from './projects.dto.js';

@Resolver(() => ProjectDto)
export class ProjectsResolver {
  constructor(private readonly projectLinkLoader: ProjectLinkLoader) {}

  @ResolveField(() => LinkDto, { nullable: true })
  link(@Parent() project: ProjectDto) {
    return this.projectLinkLoader.load(project.id);
  }
}
