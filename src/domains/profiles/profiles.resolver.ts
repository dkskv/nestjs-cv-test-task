import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ExperienceDto } from '@/domains/experience/experience.types';
import { ProjectDto } from '@/domains/projects/projects.types';
import { SkillDto } from '@/domains/skills/skills.types';
import { ExperienceLoader } from './experience.loader';
import { ProjectsLoader } from './projects.loader';
import { SkillsLoader } from './skills.loader';
import { ProfilesService } from './profiles.service';
import { CreateProfileInput, ProfileDto } from './profiles.types';

@Resolver(() => ProfileDto)
export class ProfilesResolver {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly projectsLoader: ProjectsLoader,
    private readonly experienceLoader: ExperienceLoader,
    private readonly skillsLoader: SkillsLoader,
  ) {}

  @Query(() => [ProfileDto])
  profiles() {
    return this.profilesService.findAll();
  }

  @Query(() => ProfileDto)
  profile(@Args('id', { type: () => Int }) id: number) {
    return this.profilesService.findOne(id);
  }

  @ResolveField(() => [ProjectDto])
  projects(@Parent() profile: ProfileDto) {
    return this.projectsLoader.load(profile.id);
  }

  @ResolveField(() => [ExperienceDto])
  experience(@Parent() profile: ProfileDto) {
    return this.experienceLoader.load(profile.id);
  }

  @ResolveField(() => [SkillDto])
  skills(@Parent() profile: ProfileDto) {
    return this.skillsLoader.load(profile.id);
  }

  @Mutation(() => ProfileDto)
  createProfile(@Args('input') input: CreateProfileInput) {
    return this.profilesService.create(input);
  }

  @Mutation(() => ProfileDto)
  removeProfile(@Args('id', { type: () => Int }) id: number) {
    return this.profilesService.remove(id);
  }
}
