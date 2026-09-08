import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ExperienceDto } from '@/domains/experiences/experiences.dto';
import { LinkDto } from '@/shared/dto/link.dto';
import { ProjectDto } from '@/domains/projects/projects.dto';
import { SkillDto } from '@/domains/skills/skills.dto';
import { ExperiencesLoader } from './loaders/experiences.loader';
import { ProfileLinksLoader } from './loaders/profile-links.loader';
import { ProjectsLoader } from './loaders/projects.loader';
import { SkillsLoader } from './loaders/skills.loader';
import { ProfilesService } from './profiles.service';
import {
  ProfileCreateInput,
  ProfileDto,
  ProfileUpdateInput,
} from './profiles.dto';

@Resolver(() => ProfileDto)
export class ProfilesResolver {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly projectsLoader: ProjectsLoader,
    private readonly linksLoader: ProfileLinksLoader,
    private readonly experiencesLoader: ExperiencesLoader,
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

  @ResolveField(() => [LinkDto])
  links(@Parent() profile: ProfileDto) {
    return this.linksLoader.load(profile.id);
  }

  @ResolveField(() => [ProjectDto])
  projects(@Parent() profile: ProfileDto) {
    return this.projectsLoader.load(profile.id);
  }

  @ResolveField(() => [ExperienceDto])
  experiences(@Parent() profile: ProfileDto) {
    return this.experiencesLoader.load(profile.id);
  }

  @ResolveField(() => [SkillDto])
  skills(@Parent() profile: ProfileDto) {
    return this.skillsLoader.load(profile.id);
  }

  @Mutation(() => ProfileDto)
  createProfile(@Args('input') input: ProfileCreateInput) {
    return this.profilesService.create(input);
  }

  @Mutation(() => ProfileDto)
  async updateProfile(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: ProfileUpdateInput,
  ) {
    await this.profilesService.update(id, input);

    return this.profilesService.findOne(id);
  }

  @Mutation(() => Boolean)
  async removeProfile(@Args('id', { type: () => Int }) id: number) {
    await this.profilesService.delete(id);

    return true;
  }
}
