import { Module } from '@nestjs/common';
import { ProfileLinksService } from './profile-links.service.js';

@Module({
  providers: [ProfileLinksService],
  exports: [ProfileLinksService],
})
export class ProfileLinksModule {}
