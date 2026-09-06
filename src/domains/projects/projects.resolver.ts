import {
  Args,
  Int,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LinkDto } from '@/shared/dto/link.dto';
import { ProjectLinkLoader } from '@/domains/project-links/project-link.loader';
import { ProjectsService } from './projects.service';
import { CreateProjectInput, ProjectDto } from './projects.dto';

@Resolver(() => ProjectDto)
export class ProjectsResolver {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly projectLinkLoader: ProjectLinkLoader,
  ) {}

  @ResolveField(() => LinkDto, { nullable: true })
  link(@Parent() project: ProjectDto) {
    return this.projectLinkLoader.load(project.id);
  }

  @Mutation(() => ProjectDto)
  createProject(@Args('input') input: CreateProjectInput) {
    return this.projectsService.create(input);
  }

  @Mutation(() => ProjectDto)
  removeProject(@Args('id', { type: () => Int }) id: number) {
    return this.projectsService.remove(id);
  }
}
