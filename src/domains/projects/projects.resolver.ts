import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { CreateProjectInput, ProjectDto } from './projects.types';

@Resolver(() => ProjectDto)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => ProjectDto)
  createProject(@Args('input') input: CreateProjectInput) {
    return this.projectsService.create(input);
  }

  @Mutation(() => ProjectDto)
  removeProject(@Args('id', { type: () => Int }) id: number) {
    return this.projectsService.remove(id);
  }
}
