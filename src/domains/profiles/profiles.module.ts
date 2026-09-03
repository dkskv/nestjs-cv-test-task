import { Module } from '@nestjs/common';
import { ProjectsModule } from '@/domains/projects/projects.module';
import { ProjectsLoader } from './projects.loader';
import { ProfilesResolver } from './profiles.resolver';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [ProjectsModule],
  providers: [ProfilesResolver, ProfilesService, ProjectsLoader],
})
export class ProfilesModule {}
