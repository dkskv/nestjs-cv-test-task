import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { ExperienceService } from './experience.service';
import { CreateExperienceInput, ExperienceDto } from './experience.types';

@Resolver(() => ExperienceDto)
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @Mutation(() => ExperienceDto)
  createExperience(@Args('input') input: CreateExperienceInput) {
    return this.experienceService.create(input);
  }

  @Mutation(() => ExperienceDto)
  removeExperience(@Args('id', { type: () => Int }) id: number) {
    return this.experienceService.remove(id);
  }
}
