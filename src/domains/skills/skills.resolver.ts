import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { SkillsService } from './skills.service';
import { CreateSkillInput, SkillDto } from './skills.types';

@Resolver(() => SkillDto)
export class SkillsResolver {
  constructor(private readonly skillsService: SkillsService) {}

  @Mutation(() => SkillDto)
  createSkill(@Args('input') input: CreateSkillInput) {
    return this.skillsService.create(input);
  }

  @Mutation(() => SkillDto)
  removeSkill(@Args('id', { type: () => Int }) id: number) {
    return this.skillsService.remove(id);
  }
}
