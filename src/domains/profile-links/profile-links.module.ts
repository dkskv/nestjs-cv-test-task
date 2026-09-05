import { Module } from '@nestjs/common';
import { ProfileLinksResolver } from './profile-links.resolver';
import { ProfileLinksService } from './profile-links.service';

@Module({
  providers: [ProfileLinksResolver, ProfileLinksService],
  exports: [ProfileLinksService],
})
export class ProfileLinksModule {}
