import { Module } from '@nestjs/common';
import { ProfileLinksService } from './profile-links.service';

@Module({
  providers: [ProfileLinksService],
  exports: [ProfileLinksService],
})
export class ProfileLinksModule {}
