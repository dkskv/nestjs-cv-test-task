import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { LinkDto } from '@/shared/dto/link.dto';
import { ProfileLinksService } from './profile-links.service';
import { CreateProfileLinkInput } from './profile-links.dto';

@Resolver(() => LinkDto)
export class ProfileLinksResolver {
  constructor(private readonly profileLinksService: ProfileLinksService) {}

  @Mutation(() => LinkDto)
  createProfileLink(@Args('input') input: CreateProfileLinkInput) {
    return this.profileLinksService.create(input);
  }

  @Mutation(() => LinkDto)
  removeProfileLink(@Args('id', { type: () => Int }) id: number) {
    return this.profileLinksService.remove(id);
  }
}
