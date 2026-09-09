import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ExperienceDto } from './../experiences/experiences.dto.js';
import { LinkDto } from '../../shared/dto/link.dto.js';
import { ProjectDto } from './../projects/projects.dto.js';
import { SkillDto } from './../skills/skills.dto.js';
import { ExperiencesLoader } from './loaders/experiences.loader.js';
import { ProfileLinksLoader } from './loaders/profile-links.loader.js';
import { ProjectsLoader } from './loaders/projects.loader.js';
import { SkillsLoader } from './loaders/skills.loader.js';
import { ProfilesService } from './profiles.service.js';
import {
  ProfileCreateInput,
  ProfileDto,
  ProfileUpdateInput,
} from './profiles.dto.js';

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
