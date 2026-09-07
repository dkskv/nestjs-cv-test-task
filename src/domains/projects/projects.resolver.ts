import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { LinkDto } from '@/shared/dto/link.dto';
import { ProjectLinkLoader } from '@/domains/project-links/project-link.loader';
import { ProjectDto } from './projects.dto';

@Resolver(() => ProjectDto)
export class ProjectsResolver {
  constructor(private readonly projectLinkLoader: ProjectLinkLoader) {}

  @ResolveField(() => LinkDto, { nullable: true })
  link(@Parent() project: ProjectDto) {
    return this.projectLinkLoader.load(project.id);
  }
}
