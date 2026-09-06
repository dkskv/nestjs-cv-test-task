import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { LinkDto } from '@/shared/dto/link.dto';
import { ProjectLinksService } from './project-links.service';
import { CreateProjectLinkInput } from './project-links.dto';

@Resolver(() => LinkDto)
export class ProjectLinksResolver {
  constructor(private readonly projectLinksService: ProjectLinksService) {}

  @Mutation(() => LinkDto)
  createProjectLink(@Args('input') input: CreateProjectLinkInput) {
    return this.projectLinksService.create(input);
  }

  @Mutation(() => LinkDto)
  removeProjectLink(@Args('id', { type: () => Int }) id: number) {
    return this.projectLinksService.remove(id);
  }
}
